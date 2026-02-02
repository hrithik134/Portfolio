"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import LogoSlider from "@/components/LogoSlider";
import ProjectCard from "@/components/ProjectCard";
import {
  Code2,
  Database,
  FileCode,
  Brain,
  Layers,
  Boxes,
  Container,
  Eye,
  Package,
  TrendingUp,
  Github,
  FileText,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { image } from "framer-motion/client";

type AnimatedSectionProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
  reduceMotion: boolean;
};

function AnimatedSection({
  id,
  className,
  children,
  reduceMotion,
}: AnimatedSectionProps) {
  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

type AnimatedCardProps = {
  className?: string;
  children: React.ReactNode;
  direction: "down" | "left" | "right" | "up";
  reduceMotion: boolean;
  delay?: number;
};

function AnimatedCard({
  className,
  children,
  direction,
  reduceMotion,
  delay = 0,
}: AnimatedCardProps) {
  const getInitial = () => {
    switch (direction) {
      case "down": return { opacity: 0, y: -40 };
      case "up": return { opacity: 0, y: 40 };
      case "left": return { opacity: 0, x: 40 };
      case "right": return { opacity: 0, x: -40 };
    }
  };

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const roles = useMemo(() => [
    "AI & Machine Learning Engineer",
    "Problem Solver",
    "Manga Reader",
    "ML Enthusiast",
    "Tech Explorer",
  ], []);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusMessage(null);
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("user_name") ?? "").toString();
    const email = (formData.get("email") ?? "").toString();
    const subject = (formData.get("subject") ?? "").toString();
    const message = (formData.get("message") ?? "").toString();
    const websiteValue = formData.get("website");
    const website =
      websiteValue === null || websiteValue === undefined
        ? undefined
        : websiteValue.toString();

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, website }),
      });

      if (res.ok) {
        form.reset();
        setStatusMessage("Message sent successfully.");
      } else {
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
      setImageReady(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fullText = roles[roleIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === fullText) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 200);
    } else {
      const typingSpeed = isDeleting ? 50 : 100;
      timeout = setTimeout(() => {
        const nextLength = displayText.length + (isDeleting ? -1 : 1);
        setDisplayText(fullText.slice(0, nextLength));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);


  const skills = [
    { name: "Python", logo: "/logos/python.png", fallbackIcon: Code2 },
    { name: "C++", logo: "/logos/c++.png", fallbackIcon: Code2 },
    { name: "HTML", logo: "/logos/HTML5.png", fallbackIcon: FileCode },
    { name: "SQL", logo: "/logos/sql.png", fallbackIcon: Database },
    { name: "Pandas", logo: "/logos/Pandas.png", fallbackIcon: Layers },
    { name: "NumPy", logo: "/logos/NumPy.png", fallbackIcon: Boxes },
    {
      name: "Scikit-Learn",
      logo: "/logos/scikit-learn.png",
      fallbackIcon: Brain,
    },
    {
      name: "TensorFlow",
      logo: "/logos/TensorFlow.png",
      fallbackIcon: Brain,
    },
    { name: "YOLO", logo: "/logos/yolo.png", fallbackIcon: Eye },
    { name: "OpenCV", logo: "/logos/OpenCV.png", fallbackIcon: Eye },
    { name: "Docker", logo: "/logos/Docker.png", fallbackIcon: Container },
    { name: "Pinecone", logo: "/logos/Pinecone.png", fallbackIcon: Package },
    {
      name: "Matplotlib",
      logo: "/logos/Matplotlib.png",
      fallbackIcon: TrendingUp,
    },
    { name: "Seaborn", logo: "/logos/seaborn.png", fallbackIcon: TrendingUp },
  ];

  const projects = [
    {
      title: "Credit Risk Prediction using Machine Learning Models",
      description:
        "Built and evaluated multiple machine learning models for loan default risk prediction, achieving an AUC-ROC score of 0.89 through ensemble methods and feature engineering.",
      tech: [
        "Python",
        "Scikit-Learn",
        "Random Forest",
        "XGBoost",
        "Logistic Regression",
      ],
      github: "https://github.com/user/credit-risk",
      live: "",
    },
    {
      title: "Retrieval-Augmented Generation (RAG) Pipeline",
      description:
        "Designed and deployed an end-to-end RAG system integrating LLMs with vector search, improving contextual accuracy and reducing hallucination.",
      tech: ["Python", "Pinecone", "LLMs", "FastAPI", "Vector Search"],
      github: "https://github.com/user/rag-pipeline",
      live: "",
    },
    {
      title: "AI-Powered Wildfire Detection System",
      description:
        "Built a real-time wildfire detection system using EfficientNet-B0 and YOLOv8, achieving over 95% classification accuracy and 100% mAP@0.5 for object localization.",
      tech: ["Python", "EfficientNet-B0", "YOLOv8", "OpenCV", "Flask"],
      github: "https://github.com/user/wildfire-detection",
      live: "",
      image: "D:\\Portfolio\\portfolio\\public\\Projects\\AI-wildfire.png",
    },
  ];

  const topRowProjects = [
    {
      title: "AI Powered Wildfire Detection System",
      description:
        "Real-time wildfire detection using EfficientNet-B0 and YOLOv8 with high classification accuracy and object localization.",
      tech: ["Python", "EfficientNet-B0", "YOLOv8", "OpenCV", "Flask"],
      github: "https://github.com/hrithik134/AI-Wildfire-Detection-Using-Hybrid-Model-Architecture",
      live: "",
      image: "/Projects/AI-wildfire.png",
    },
    {
      title: "AI-Backend Reliability Copilot",
      description:
        "Full-stack generative AI agent that helps backend developers analyze proposed changes before deployment. Detects breaking changes, assesses risk, and generates safe, structured guidance.",
      tech: ["Python", "FastAPI", "Pydantic AI", "OpenRouter", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      github: "https://github.com/hrithik134/AI-Backend-Reliability-Copilot134",
      live: "",
      image: undefined,
    },
    {
      title: "Production-Ready RAG Pipeline",
      description:
        "End-to-end RAG system integrating LLMs with vector search for improved contextual accuracy and reduced hallucination.",
      tech: ["Python", "Pinecone", "LLMs", "FastAPI", "Vector Search"],
      github: "https://github.com/hrithik134/RAG-pipeline",
      live: "",
      image: undefined,
    },
  ];

  const bottomRowProjects = [
    {
      title: "Credit Risk Score Analysis",
      description:
        "ML models for loan default risk prediction with ensemble methods and feature engineering.",
      tech: ["Python", "Scikit-Learn", "Random Forest", "XGBoost", "Logistic Regression"],
      github: "https://github.com/hrithik134/ML-credit-risk-pred",
      live: "",
      image: undefined,
    },
    {
      title: "AR-Gesture based Inventory Management System",
      description:
        "Personalized workout and nutrition guidance powered by powerful LLM (eg: GPT-4o,Gemini) for Fitness/gym consistent Individuals.",
      tech: ["GPT-4o", "API", "Fitness"],
      github: "",
      live: "",
      image: undefined,
    },
    {
      title: "Coming Soon",
      description: "Next project in the works.",
      tech: [] as string[],
      github: "",
      live: "",
      image: undefined,
      isPlaceholder: true,
    },
  ];

  // Nexus Card modal
  const [isNexusOpen, setIsNexusOpen] = useState(false);
  const [isNexusClosing, setIsNexusClosing] = useState(false);
  const nexusTriggerRef = useRef<HTMLButtonElement | null>(null);
  const nexusPlaceholderRef = useRef<HTMLDivElement | null>(null);

  const SOCIAL_LINKS = {
    linkedin: "https://linkedin.com/in/hrithiks134/",
    github: "https://github.com/hrithik134",
    email: "mailto:hrithiksrine5297@gmail.com",
    leetcode: "https://leetcode.com/u/hrithiksrine5297/",
  };

  // Per-row carousel state (independent, no shared controllers)
  const [topCurrentIndex, setTopCurrentIndex] = useState(0);
  const [topIsPaused, setTopIsPaused] = useState(false);
  const [topIsDragging, setTopIsDragging] = useState(false);
  const [bottomCurrentIndex, setBottomCurrentIndex] = useState(0);
  const [bottomIsPaused, setBottomIsPaused] = useState(false);
  const [bottomIsDragging, setBottomIsDragging] = useState(false);

  const topRowRef = useRef<HTMLDivElement>(null);
  const topCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const topCurrentIndexRef = useRef(0);
  const topScrollIndexRef = useRef(0);
  const topDragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const bottomCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomCurrentIndexRef = useRef(0);
  const bottomScrollIndexRef = useRef(0);
  const bottomDragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const draggingRowRef = useRef<"top" | "bottom" | null>(null);
  const setTopIsDraggingRef = useRef(setTopIsDragging);
  const setTopIsPausedRef = useRef(setTopIsPaused);
  const setBottomIsDraggingRef = useRef(setBottomIsDragging);
  const setBottomIsPausedRef = useRef(setBottomIsPaused);
  setTopIsDraggingRef.current = setTopIsDragging;
  setTopIsPausedRef.current = setTopIsPaused;
  setBottomIsDraggingRef.current = setBottomIsDragging;
  setBottomIsPausedRef.current = setBottomIsPaused;

  // Top row: keep currentIndexRef in sync for interval
  useEffect(() => {
    topCurrentIndexRef.current = topCurrentIndex;
  }, [topCurrentIndex]);
  useEffect(() => {
    bottomCurrentIndexRef.current = bottomCurrentIndex;
  }, [bottomCurrentIndex]);

  // Save scroll position on reload (same tab); new tab has no saved value so starts at top
  useEffect(() => {
    const save = () => sessionStorage.setItem("portfolioScrollY", String(window.scrollY));
    window.addEventListener("beforeunload", save);
    window.addEventListener("pagehide", save);
    return () => {
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pagehide", save);
    };
  }, []);
  useEffect(() => {
    if (typeof window.history.scrollRestoration !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
    const saved = sessionStorage.getItem("portfolioScrollY");
    if (saved !== null) {
      const y = parseInt(saved, 10);
      if (!Number.isNaN(y)) {
        window.scrollTo(0, y);
        sessionStorage.removeItem("portfolioScrollY");
      }
    }
  }, []);

  // Nexus modal: scroll lock + Esc close (cleanup restores scroll and removes listener)
  useEffect(() => {
    if (!isNexusOpen && !isNexusClosing) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      closeNexus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNexusOpen, isNexusClosing]);

  // Focus trap: focus placeholder when Nexus modal opens
  useEffect(() => {
    if (isNexusOpen) nexusPlaceholderRef.current?.focus();
  }, [isNexusOpen]);

  const closeNexus = () => {
    setIsNexusClosing(true);
    setTimeout(() => {
      setIsNexusOpen(false);
      setIsNexusClosing(false);
      const trigger = nexusTriggerRef.current;
      if (trigger && typeof trigger.focus === "function") {
        try {
          (trigger as HTMLElement).focus({ preventScroll: true } as any);
        } catch {
          trigger.focus();
        }
      }
    }, 200);
  };

  // Top row auto-scroll every 8s (3 cards)
  useEffect(() => {
    if (topIsPaused) return;
    const id = setInterval(() => {
      const container = topRowRef.current;
      const cards = topCardRefs.current;
      if (!container || cards.length < 3) return;
      const next = (topScrollIndexRef.current + 1) % 3;
      const targetLeft = cards[next]?.offsetLeft ?? 0;
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
      topScrollIndexRef.current = next;
      topCurrentIndexRef.current = next;
      setTopCurrentIndex(next);
    }, 8000);
    return () => clearInterval(id);
  }, [topIsPaused]);

  // Bottom row auto-scroll every 10s (3 cards)
  useEffect(() => {
    if (bottomIsPaused) return;
    const id = setInterval(() => {
      const container = bottomRowRef.current;
      const cards = bottomCardRefs.current;
      if (!container || cards.length < 3) return;
      const next = (bottomScrollIndexRef.current + 1) % 3;
      const targetLeft = cards[next]?.offsetLeft ?? 0;
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
      bottomScrollIndexRef.current = next;
      bottomCurrentIndexRef.current = next;
      setBottomCurrentIndex(next);
    }, 10000);
    return () => clearInterval(id);
  }, [bottomIsPaused]);

  // Top row Intersection Observer (sync currentIndex, threshold 0.6)
  useEffect(() => {
    const container = topRowRef.current;
    const cards = topCardRefs.current;
    if (!container || !cards.length) return;
    type Best = { index: number; ratio: number };
    const observer = new IntersectionObserver(
      (entries) => {
        let best: Best | null = null;
        entries.forEach((entry) => {
          const idx = cards.indexOf(entry.target as HTMLDivElement);
          if (idx >= 0 && entry.intersectionRatio >= 0.6) {
            if (!best || entry.intersectionRatio > best.ratio) {
              best = { index: idx, ratio: entry.intersectionRatio };
            }
          }
        });
        if (best !== null) {
          const idx = (best as Best).index;
          topScrollIndexRef.current = idx;
          topCurrentIndexRef.current = idx;
          setTopCurrentIndex(idx);
        }
      },
      { root: container, threshold: 0.6 }
    );
    cards.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Bottom row Intersection Observer
  useEffect(() => {
    const container = bottomRowRef.current;
    const cards = bottomCardRefs.current;
    if (!container || !cards.length) return;
    type Best = { index: number; ratio: number };
    const observer = new IntersectionObserver(
      (entries) => {
        let best: Best | null = null;
        entries.forEach((entry) => {
          const idx = cards.indexOf(entry.target as HTMLDivElement);
          if (idx >= 0 && entry.intersectionRatio >= 0.6) {
            if (!best || entry.intersectionRatio > best.ratio) {
              best = { index: idx, ratio: entry.intersectionRatio };
            }
          }
        });
        if (best !== null) {
          const idx = (best as Best).index;
          bottomScrollIndexRef.current = idx;
          bottomCurrentIndexRef.current = idx;
          setBottomCurrentIndex(idx);
        }
      },
      { root: container, threshold: 0.6 }
    );
    cards.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Document-level drag (move/up) so drag works when pointer leaves row (move/up) so drag works when pointer leaves row (move/up) so drag works when pointer leaves row
  useEffect(() => {
    const getClientX = (e: MouseEvent | TouchEvent): number =>
      "touches" in e ? (e as TouchEvent).touches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;
    const getClientXUp = (e: MouseEvent | TouchEvent): number =>
      "changedTouches" in e ? (e as TouchEvent).changedTouches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const row = draggingRowRef.current;
      if (row === "top") {
        const r = topRowRef.current;
        const start = topDragStartRef.current;
        if (r) r.scrollLeft = start.scrollLeft + start.x - getClientX(e);
      } else if (row === "bottom") {
        const r = bottomRowRef.current;
        const start = bottomDragStartRef.current;
        if (r) r.scrollLeft = start.scrollLeft + start.x - getClientX(e);
      }
    };
    const snapToNearest = (
      container: HTMLDivElement | null,
      cards: (HTMLDivElement | null)[],
      scrollIndexRef: { current: number },
      setCurrentIndex: (i: number) => void
    ) => {
      if (!container || cards.length < 3) return;
      const scrollLeft = container.scrollLeft;
      const offsets = cards.slice(0, 3).map((c) => c?.offsetLeft ?? 0);
      let bestIdx = 0;
      let bestDist = Math.abs(offsets[0] - scrollLeft);
      for (let i = 1; i < 3; i++) {
        const d = Math.abs(offsets[i] - scrollLeft);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      container.scrollTo({ left: offsets[bestIdx] ?? 0, behavior: "smooth" });
      scrollIndexRef.current = bestIdx;
      setCurrentIndex(bestIdx);
    };
    const onUp = (e: MouseEvent | TouchEvent) => {
      const row = draggingRowRef.current;
      if (row === "top") {
        snapToNearest(topRowRef.current, topCardRefs.current, topScrollIndexRef, setTopCurrentIndex);
        topCurrentIndexRef.current = topScrollIndexRef.current;
        setTopIsDraggingRef.current(false);
        setTopIsPausedRef.current(false);
        draggingRowRef.current = null;
      } else if (row === "bottom") {
        snapToNearest(bottomRowRef.current, bottomCardRefs.current, bottomScrollIndexRef, setBottomCurrentIndex);
        bottomCurrentIndexRef.current = bottomScrollIndexRef.current;
        setBottomIsDraggingRef.current(false);
        setBottomIsPausedRef.current(false);
        draggingRowRef.current = null;
      }
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onUp);
    document.addEventListener("touchcancel", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
      document.removeEventListener("touchcancel", onUp);
    };
  }, []);

  const scrollTopLeft = () => {
    const container = topRowRef.current;
    const cards = topCardRefs.current;
    if (!container || cards.length < 3) return;
    const next = (topScrollIndexRef.current - 1 + 3) % 3;
    container.scrollTo({ left: cards[next]?.offsetLeft ?? 0, behavior: "smooth" });
    topScrollIndexRef.current = next;
    topCurrentIndexRef.current = next;
    setTopCurrentIndex(next);
  };
  const scrollTopRight = () => {
    const container = topRowRef.current;
    const cards = topCardRefs.current;
    if (!container || cards.length < 3) return;
    const next = (topScrollIndexRef.current + 1) % 3;
    container.scrollTo({ left: cards[next]?.offsetLeft ?? 0, behavior: "smooth" });
    topScrollIndexRef.current = next;
    topCurrentIndexRef.current = next;
    setTopCurrentIndex(next);
  };
  const scrollBottomLeft = () => {
    const container = bottomRowRef.current;
    const cards = bottomCardRefs.current;
    if (!container || cards.length < 3) return;
    const next = (bottomScrollIndexRef.current - 1 + 3) % 3;
    container.scrollTo({ left: cards[next]?.offsetLeft ?? 0, behavior: "smooth" });
    bottomScrollIndexRef.current = next;
    bottomCurrentIndexRef.current = next;
    setBottomCurrentIndex(next);
  };
  const scrollBottomRight = () => {
    const container = bottomRowRef.current;
    const cards = bottomCardRefs.current;
    if (!container || cards.length < 3) return;
    const next = (bottomScrollIndexRef.current + 1) % 3;
    container.scrollTo({ left: cards[next]?.offsetLeft ?? 0, behavior: "smooth" });
    bottomScrollIndexRef.current = next;
    bottomCurrentIndexRef.current = next;
    setBottomCurrentIndex(next);
  };

  const arrowCardClass =
    "flex-shrink-0 w-14 flex items-center justify-center rounded-lg bg-[rgba(41,41,41,1)] border border-white/10 border-[var(--color-accent)]/10 backdrop-blur-md shadow-lg shadow-black/20 cursor-pointer hover:bg-white/10 transition-colors self-stretch";

  return (
    <>
      {(isNexusOpen || isNexusClosing) &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Nexus Card"
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[8px] ${isNexusClosing ? "animate-nexus-out" : "animate-nexus-in"}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeNexus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") e.preventDefault();
            }}
          >
            <div
              ref={nexusPlaceholderRef}
              tabIndex={0}
              className="flex flex-col overflow-visible w-full max-w-[340px] min-h-[420px] rounded-2xl border border-white/10 border-t border-white/10 bg-black/95 nexus-card-glow"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Tab") e.preventDefault();
              }}
            >
              {/* Section A — Banner */}
              <div
                className={`h-28 rounded-t-2xl border-b border-white/10 flex-shrink-0 flex items-center justify-center ${
                  isDark ? "bg-gradient-to-b from-[#3b0764] to-[#5b21b6]" : "bg-[#0F766E]"
                }`}
                aria-hidden
              >
                <span className="font-nexus-banner text-4xl md:text-5xl tracking-widest select-none text-white">
                  Rishiki
                </span>
              </div>
              {/* Avatar (flow-safe overlap) */}
              <div className="flex justify-center -mt-10 flex-shrink-0">
                <img
                  src={isDark ? "/images/2.png" : "/images/1.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                />
              </div>
              {/* Section B — Main body */}
              <div className="flex-1 flex flex-col items-center gap-4 rounded-b-2xl bg-white/[0.06] border border-t-0 border-white/10 p-6 pt-8 min-h-0">
                {/* Name */}
                <span className="font-semibold text-white text-center">Hrithik</span>
                {/* Role pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-transparent text-sm text-white/90 nexus-role-pill-glow">
                    AI/ML Engineer
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-transparent text-sm text-white/90 nexus-role-pill-glow">
                    Tech Explorer
                  </span>
                </div>
                {/* Location row */}
                <div className="flex items-center justify-center gap-1.5 text-sm text-[var(--color-muted)]">
                  <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden />
                  <span>India</span>
                </div>
                {/* Social icons row */}
                <div className="flex justify-center gap-3">
                  <a
                    href={SOCIAL_LINKS.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-[var(--color-accent)]"
                    aria-label="LeetCode"
                  >
                    <img src={`https://cdn.simpleicons.org/leetcode/${isDark ? "7C3AED" : "0F766E"}`} alt="" className="w-5 h-5" aria-hidden />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-[var(--color-accent)]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" aria-hidden />
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-[var(--color-accent)]"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" aria-hidden />
                  </a>
                  <a
                    href={SOCIAL_LINKS.email}
                    className="cursor-pointer text-[var(--color-accent)]"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" aria-hidden />
                  </a>
                  <a
                    href="#"
                    className="cursor-pointer text-[var(--color-accent)]"
                    aria-label="Sparkles"
                    aria-hidden
                  >
                    <Sparkles className="w-5 h-5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      <main>
        <section id="hero" className="relative min-h-screen flex items-center px-4 scroll-mt-[120px]">
        <div className="pointer-events-none absolute inset-0 hidden md:block z-0">
          <div className="hero-float-chip hero-float-chip-1 top-8 left-6 lg:left-16 -rotate-[4deg]">
            <Code2 className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
          </div>
          <div className="hero-float-chip hero-float-chip-2 top-24 right-6 lg:right-24 rotate-3">
            <Brain className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
          </div>
          <div className="hero-float-chip hero-float-chip-3 bottom-28 left-4 lg:left-1/4 rotate-2">
            <Layers className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
          </div>
          <div className="hero-float-chip hero-float-chip-4 bottom-24 right-4 lg:right-32 -rotate-3">
            <Container className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
          </div>
          <div className="hero-float-chip hero-float-chip-5 top-1/3 right-1/2 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 -translate-y-10 rotate-1">
            <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 max-w-xl space-y-3 text-center md:text-left md:transform md:translate-x-[150px] md:-translate-y-[70px]">
              <div>
                <h2 className="text-[60px] font-heading font-bold">
                  Hello<span className="text-[var(--color-accent)]">.</span>{" "}
                  I&apos;m Hrithik S
                </h2>
                <div className="w-fit border-b-2 border-[var(--color-accent)] mt-2"></div>
              </div>
              <div className="min-h-[3.5rem] md:min-h-[4.5rem] lg:min-h-[5.5rem] flex items-center justify-center md:justify-start md:transform md:-translate-y-[25px]">
                <h3 className="text-[25px] font-heading font-bold">
                  {displayText}
                  <span className="typing-cursor text-[var(--color-accent)]">|</span>
                </h3>
              </div>
              <p className="my-4 max-w-[460px] mx-auto md:mx-0 text-base text-muted-foreground font-normal md:transform md:-translate-y-[35px]">
              Computer Science student actively exploring Generative AI and LLM orchestration while
              building production-ready systems with ML, computer vision, 
              and backend APIs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start md:transform md:-translate-y-[35px]">
                <a
                  href="https://github.com/hrithik134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-base font-medium border border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:opacity-90"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://drive.google.com/file/d/18Fpu0xgacW40QaTrlycrEIt54GEI7iua/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-base font-medium border border-[var(--color-accent)] text-[var(--color-accent)] transition-colors duration-225 hover:text-[#F5F5F5] ${isDark ? "hover:bg-[#7C3AED]" : "hover:bg-[#0F766E]"}`}
                >
                  <FileText className="w-4 h-4 text-current" aria-hidden="true" />
                  <span>Resume</span>
                </a>
                <button
                  type="button"
                  id="nexus-trigger"
                  ref={nexusTriggerRef}
                  aria-label="Open Nexus Card"
                  onClick={() => setIsNexusOpen(true)}
                  className={`inline-flex items-center justify-center px-4 py-3 rounded-md text-base font-medium border bg-black/5 dark:bg-[rgba(26, 27, 29, 0.18)] backdrop-blur-md cursor-pointer transition-colors duration-225 ${isDark ? "border-[#E5E7EB] hover:bg-[#7C3AED]" : "border-black hover:bg-[#0F766E]"}`}
                >
                  <img
                    src={isDark ? "/logos/nexus-inverted.png" : "/logos/nexus.png"}
                    alt="Nexus logo"
                    className="w-[20px] h-[14px] max-h-full"
                  />
                </button>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="flex-1 flex justify-center md:justify-end items-center relative">
              <div className="relative w-full max-w-[400px] aspect-square">
                <img
                  src="/images/1.png"
                  alt="Profile"
                  className="absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-[1.5s]"
                  style={{
                    opacity: imageReady && !isDark ? 1 : 0,
                    transform: "translate(-135px, -80px) scale(1.2)",
                    zIndex: !isDark ? 1 : 0,
                  }}
                  aria-hidden={isDark}
                />
                <img
                  src="/images/2.png"
                  alt="Profile"
                  className="absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-[1.5s]"
                  style={{
                    opacity: imageReady && isDark ? 1 : 0,
                    transform: "translate(-135px, -80px) scale(1.2)",
                    zIndex: isDark ? 1 : 0,
                  }}
                  aria-hidden={!isDark}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-28 text-center text-sm text-muted-foreground opacity-70">
          Scroll to explore
        </div>
      </section>

      <AnimatedSection
        id="about"
        className="pt-6 pb-24 px-4 scroll-mt-[100px]"
        reduceMotion={!!shouldReduceMotion}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="flex flex-col items-center text-center mb-8">
            <h2
              className="text-2xl md:text-3xl font-heading font-bold"
              style={{ fontSize: "40px" }}
            >
              About Me
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* My Journey - downward fade in */}
            <AnimatedCard className="lg:col-span-7" direction="down" reduceMotion={!!shouldReduceMotion}>
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20 gap-4 h-full">
                {/* Icon placeholder */}
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                
                {/* Card title */}
                <h3 className="text-xl font-heading font-bold mt-3">My Journey</h3>
                
                {/* Main content paragraph */}
                <p className="text-base text-muted-foreground mt-2">
                  I entered software development through machine learning and data-driven problem solving. 
                  Since then, I&apos;ve focused on building AI systems that are not just accurate, but reliable 
                  and practical to deploy.
                </p>
                
                {/* Stats row (3 items) */}
                <div className="flex gap-6 mt-4">
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-center text-[var(--color-accent)]">2+</div>
                    <div className="text-[13px]"> Years Coding</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-center text-[var(--color-accent)]">8+</div>
                    <div className="text-[13px]">Projects Built</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-center text-[var(--color-accent)]">AI & ML</div>
                    <div className="text-[13px]">Specialization</div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Education - leftward fade in */}
            <AnimatedCard className="lg:col-span-5" direction="left" reduceMotion={!!shouldReduceMotion} delay={0.1}>
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20 gap-4 h-full">
                {/* Icon placeholder */}
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                
                {/* Card title */}
                <h3 className="text-xl font-heading font-bold mt-3">Education</h3>
                
                {/* Content lines (stacked) */}
                <div className="text-base space-y-2 text-muted-foreground">
                  <div className="text-[var(--color-muted)]">B.Tech in Computer Science (AI & ML)</div>
                  <div className="text-[var(--color-muted)]">SRM Institute of Science and Technology, Ramapuram</div>
                  <div className="text-[var(--color-muted)]">2022 – 2026</div>
                  <div>CGPA: <span className="text-[var(--color-accent)]">8.77</span></div>
                </div>
              </div>
            </AnimatedCard>

            {/* Passion - rightward fade in */}
            <AnimatedCard className="lg:col-span-5" direction="right" reduceMotion={!!shouldReduceMotion} delay={0.2}>
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20 gap-4 h-full">
                {/* Icon placeholder */}
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                
                {/* Card title */}
                <h3 className="text-xl font-heading font-bold mt-3">Passion</h3>
                
                {/* Tag container (5 passion areas) */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1.5 rounded-full bg-[var(--color-accent)] text-sm border border-white/10">Artificial Intelligence & Machine Learning</span>
                  <span className="px-3 py-1.5 rounded-full bg-[var(--color-accent)] text-sm border border-white/10">Computer Vision & Deep Learning</span>
                  <span className="px-3 py-1.5 rounded-full bg-[var(--color-accent)] text-sm border border-white/10">Backend & Scalable Systems</span>
                  <span className="px-3 py-1.5 rounded-full bg-[var(--color-accent)] text-sm border border-white/10">Generative AI & RAG Pipelines</span>
                  <span className="px-3 py-1.5 rounded-full bg-[var(--color-accent)] text-sm border border-white/10">Automation & Problem Solving</span>
                </div>
              </div>
            </AnimatedCard>

            {/* Internship - upward fade in */}
            <AnimatedCard className="lg:col-span-7" direction="up" reduceMotion={!!shouldReduceMotion} delay={0.3}>
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20 gap-4 h-full">
                {/* Icon placeholder */}
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                
                {/* Card title */}
                <h3 className="text-xl font-heading font-bold mt-3">Internship</h3>
                
                {/* Internship entries container - 2 column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  {/* OOstudios - Active */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-semibold text-base">OOstudios</h4>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">AI / ML Engineer</p>
                    <p className="text-sm text-muted-foreground">Movie post-production platform tool</p>
                    <p className="text-xs text-muted-foreground">Actively working</p>
                  </div>

                  {/* Jay Robotics */}
                  <div className="flex flex-col gap-1">
                    <h4 className="font-heading font-semibold text-base">Jay Robotics</h4>
                    <p className="text-sm font-medium text-muted-foreground">Web/Mobile UI Dev Intern</p>
                    <p className="text-sm text-muted-foreground">Robotics and Education sector</p>
                    <p className="text-xs text-muted-foreground">June 2024 – July 2024</p>
                  </div>

                  {/* Prolifics Inc. */}
                  <div className="flex flex-col gap-1">
                    <h4 className="font-heading font-semibold text-base">Prolifics Inc.</h4>
                    <p className="text-sm font-medium text-muted-foreground">Machine Learning Engineer Intern</p>
                    <p className="text-sm text-muted-foreground">IT solutions provider</p>
                    <p className="text-xs text-muted-foreground">June 2023 – July 2023</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="skills"
        className="-mt-[110px] pt-8 pb-5 flex flex-col items-center px-4 scroll-mt-24 overflow-x-hidden"
        reduceMotion={!!shouldReduceMotion}
      >
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Static title - left-aligned with bar */}
          <div className="flex flex-row items-center gap-3 mb-6 ml-[30px]">
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-heading font-bold mt-[15px]">Tech Stack</h3>
          </div>
          {/* Scrolling bar */}
          <LogoSlider items={skills} />
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="projects"
        className="py-20 px-4 scroll-mt-[40px] select-none"
        reduceMotion={!!shouldReduceMotion}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Projects
            </h2>
          </div>

          {/* Top Projects Row */}
          <div className="flex items-stretch gap-4 w-full">
            <button
              type="button"
              className={arrowCardClass}
              onClick={scrollTopLeft}
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="w-7 h-7 text-white" aria-hidden />
            </button>
              <div className="relative flex-1 min-w-0 flex flex-col">
              <span className="absolute bottom-2 right-2 z-10 font-sans text-xs font-medium tracking-widest pointer-events-none" style={{ color: isDark ? "#7c3aed" : "#0f766e" }}>
                {topCurrentIndex + 1} / 3
              </span>
              <div
                ref={topRowRef}
                className="flex flex-row gap-4 overflow-x-hidden snap-x snap-mandatory h-full"
                style={{ scrollSnapType: topIsDragging ? "none" : undefined }}
                aria-roledescription="carousel"
                onMouseDown={(e) => {
                  topDragStartRef.current = { x: e.clientX, scrollLeft: topRowRef.current?.scrollLeft ?? 0 };
                  draggingRowRef.current = "top";
                  setTopIsPaused(true);
                  setTopIsDragging(true);
                }}
                onMouseUp={() => {
                  if (draggingRowRef.current !== "top") setTopIsPaused(false);
                }}
                onMouseLeave={() => {
                  if (draggingRowRef.current !== "top") setTopIsPaused(false);
                }}
                onTouchStart={(e) => {
                  topDragStartRef.current = { x: e.touches[0].clientX, scrollLeft: topRowRef.current?.scrollLeft ?? 0 };
                  draggingRowRef.current = "top";
                  setTopIsPaused(true);
                  setTopIsDragging(true);
                }}
                onTouchEnd={() => {
                  if (draggingRowRef.current !== "top") setTopIsPaused(false);
                }}
                onTouchCancel={() => {
                  if (draggingRowRef.current === "top") {
                    setTopIsDragging(false);
                    setTopIsPaused(false);
                    draggingRowRef.current = null;
                  }
                }}
              >
              {topRowProjects.map((p, i) => (
                <div
                  key={`top-${p.title}-${i}`}
                  ref={(el) => {
                    topCardRefs.current[i] = el;
                  }}
                  className="min-w-full max-w-full flex-shrink-0 snap-center p-6 rounded bg-white dark:bg-white/5 border-0 backdrop-blur-md shadow-lg shadow-black/20 box-border"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={p.title}
                >
                  <ProjectCard
                    title={p.title}
                    description={p.description}
                    tech={p.tech}
                    imagePosition="left"
                    image={p.image}
                    github={p.github || undefined}
                    live={p.live || undefined}
                  />
                </div>
              ))}
              </div>
            </div>
            <button
              type="button"
              className={arrowCardClass}
              onClick={scrollTopRight}
              aria-label="Scroll projects right"
            >
              <ChevronRight className="w-7 h-7 text-white" aria-hidden />
            </button>
          </div>

          {/* Bottom Projects Row */}
          <div className="flex items-stretch gap-4 w-full">
            <button
              type="button"
              className={arrowCardClass}
              onClick={scrollBottomLeft}
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="w-7 h-7 text-white" aria-hidden />
            </button>
            <div className="relative flex-1 min-w-0 flex flex-col">
              <span className="absolute bottom-2 right-2 z-10 font-sans text-xs font-medium tracking-widest pointer-events-none" style={{ color: isDark ? "#7c3aed" : "#0f766e" }}>
                {bottomCurrentIndex + 1} / 3
              </span>
              <div
                ref={bottomRowRef}
                className="flex flex-row gap-4 overflow-x-hidden snap-x snap-mandatory h-full"
                style={{ scrollSnapType: bottomIsDragging ? "none" : undefined }}
                aria-roledescription="carousel"
                onMouseDown={(e) => {
                  bottomDragStartRef.current = { x: e.clientX, scrollLeft: bottomRowRef.current?.scrollLeft ?? 0 };
                  draggingRowRef.current = "bottom";
                  setBottomIsPaused(true);
                  setBottomIsDragging(true);
                }}
                onMouseUp={() => {
                  if (draggingRowRef.current !== "bottom") setBottomIsPaused(false);
                }}
                onMouseLeave={() => {
                  if (draggingRowRef.current !== "bottom") setBottomIsPaused(false);
                }}
                onTouchStart={(e) => {
                  bottomDragStartRef.current = { x: e.touches[0].clientX, scrollLeft: bottomRowRef.current?.scrollLeft ?? 0 };
                  draggingRowRef.current = "bottom";
                  setBottomIsPaused(true);
                  setBottomIsDragging(true);
                }}
                onTouchEnd={() => {
                  if (draggingRowRef.current !== "bottom") setBottomIsPaused(false);
                }}
                onTouchCancel={() => {
                  if (draggingRowRef.current === "bottom") {
                    setBottomIsDragging(false);
                    setBottomIsPaused(false);
                    draggingRowRef.current = null;
                  }
                }}
              >
              {bottomRowProjects.map((p, i) => (
                <div
                  key={`bottom-${p.title}-${i}`}
                  ref={(el) => {
                    bottomCardRefs.current[i] = el;
                  }}
                  className="min-w-full max-w-full flex-shrink-0 snap-center p-6 rounded bg-white dark:bg-white/5 border-0 backdrop-blur-md shadow-lg shadow-black/20 box-border"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={p.title}
                >
                  <ProjectCard
                    title={p.title}
                    description={p.description}
                    tech={p.tech}
                    imagePosition="right"
                    image={p.image}
                    github={p.github || undefined}
                    live={p.live || undefined}
                    isPlaceholder={"isPlaceholder" in p && p.isPlaceholder}
                  />
                </div>
              ))}
              </div>
            </div>
            <button
              type="button"
              className={arrowCardClass}
              onClick={scrollBottomRight}
              aria-label="Scroll projects right"
            >
              <ChevronRight className="w-7 h-7 text-white" aria-hidden />
            </button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="contact"
        className="py-20 px-4 scroll-mt-[50px]"
        reduceMotion={!!shouldReduceMotion}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Heading */}
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              {"Let's Build Something"}
            </h2>
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              Amazing Together
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch">
            {/* Left: 3 cards */}
            <div className="md:col-span-2 flex flex-col gap-8">
              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center overflow-hidden" aria-hidden="true">
                    <img src="/Contact/email.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--color-fg)]">Email</h3>
                    <p className="text-sm text-zinc-400">hrithiksrine5297@gmail.com</p>
                  </div>
                  <a
                    href={SOCIAL_LINKS.email}
                    className="text-sm text-[var(--color-accent)] underline"
                  >
                    Send Message
                  </a>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center overflow-hidden" aria-hidden="true">
                    <img src="/Contact/linkedin.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--color-fg)]">LinkedIn</h3>
                    <p className="text-sm text-zinc-400">{"Let's connect professionally"}</p>
                  </div>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent)] underline"
                  >
                    Connect
                  </a>
                </div>
              </div>

              {/* GitHub Card */}
              <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center overflow-hidden" aria-hidden="true">
                    <img src="/Contact/github.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--color-fg)]">GitHub</h3>
                    <p className="text-sm text-zinc-400">Check out my repositories</p>
                  </div>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-accent)] underline"
                  >
                    Follow
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="md:col-span-3 flex">
              <div className="p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-black/20 w-full">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div>
                    <label htmlFor="user_name" className="sr-only">
                      Your Name
                    </label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-[rgba(245,245,245,1)] border border-white/5 text-black caret-black placeholder:text-zinc-500 focus:outline-none focus:border-[var(--color-accent)]/30"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="user_email" className="sr-only">
                      Your Email
                    </label>
                    <input
                      id="user_email"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-[rgba(245,245,245,1)] border border-white/5 text-black caret-black placeholder:text-zinc-500 focus:outline-none focus:border-[var(--color-accent)]/30"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="sr-only">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-2 rounded-lg bg-[rgba(245,245,245,1)] border border-white/5 text-black caret-black placeholder:text-zinc-500 focus:outline-none focus:border-[var(--color-accent)]/30"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      required
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg bg-[rgba(245,245,245,1)] border border-white/5 text-black caret-black placeholder:text-zinc-500 focus:outline-none focus:border-[var(--color-accent)]/30 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white text-base font-medium flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  {statusMessage && (
                    <p className="text-sm text-[var(--color-fg)]/80 mt-1">
                      {statusMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      </main>
    </>
  );
}
