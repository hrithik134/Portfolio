import { z } from "zod";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1).max(5000),
  website: z.string().optional().nullable(),
});

type ContactBody = z.infer<typeof contactSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

const hasRedisConfig =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL as string,
      token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
    })
  : null;

const ipRequestLog = new Map<string, number[]>();

function getClientIp(request: Request): string | null {
  const xff = request.headers.get("x-forwarded-for");
  if (!xff) return null;
  const first = xff.split(",")[0]?.trim();
  return first || null;
}

function tooManyRequestsResponse(): Response {
  return new Response(
    JSON.stringify({
      error: "Too many requests. Please try again later.",
    }),
    {
      status: 429,
      headers: {
        "Retry-After": "60",
        "Content-Type": "application/json",
      },
    }
  );
}

async function handlePost(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as unknown;

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          ok: false,
          errors: result.error.flatten(),
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data: ContactBody = result.data;

    // Honeypot: if website has any non-empty value, silently accept without sending
    if (typeof data.website === "string" && data.website.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const clientIp = getClientIp(request);

    // Baseline in-memory defensive guard (per-instance, best-effort)
    if (clientIp) {
      const now = Date.now();
      const windowMs = 60_000;
      const shortWindowMs = 10_000;
      const existing = ipRequestLog.get(clientIp) ?? [];
      const recent = existing.filter((ts) => now - ts < windowMs);
      recent.push(now);
      ipRequestLog.set(clientIp, recent);

      const recentShort = recent.filter((ts) => now - ts < shortWindowMs);
      if (recentShort.length > 3) {
        return tooManyRequestsResponse();
      }
    }

    // Optional Upstash Redis rate limiting (fail-open)
    if (clientIp && redis) {
      try {
        const key = `contact:${clientIp}`;
        const count = await redis.incr(key);
        if (count === 1) {
          await redis.expire(key, 60);
        }
        if (count > 5) {
          return tooManyRequestsResponse();
        }
      } catch (error) {
        console.error("/api/contact rate-limit error", error);
        // Fail-open: continue to email sending
      }
    }

    if (!CONTACT_TO_EMAIL) {
      // Misconfigured server; treat as internal error
      console.error("/api/contact email error: CONTACT_TO_EMAIL missing");
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Internal Server Error",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: CONTACT_TO_EMAIL,
      reply_to: data.email,
      subject: `[Portfolio Contact] ${data.subject}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("/api/contact email error", error);

    return new Response(
      JSON.stringify({
        ok: false,
        error: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

function methodNotAllowed(): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Method Not Allowed",
    }),
    {
      status: 405,
      headers: {
        Allow: "POST",
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(request: Request): Promise<Response> {
  return handlePost(request);
}

export async function GET(): Promise<Response> {
  return methodNotAllowed();
}

export async function PUT(): Promise<Response> {
  return methodNotAllowed();
}

export async function PATCH(): Promise<Response> {
  return methodNotAllowed();
}

export async function DELETE(): Promise<Response> {
  return methodNotAllowed();
}

export async function OPTIONS(): Promise<Response> {
  return methodNotAllowed();
}

export async function HEAD(): Promise<Response> {
  return methodNotAllowed();
}

