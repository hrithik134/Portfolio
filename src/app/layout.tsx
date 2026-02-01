import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.className} ${jakarta.variable} ${lora.variable}`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    if (typeof history !== 'undefined' && history.scrollRestoration != null)
      history.scrollRestoration = 'manual';
    var saved = sessionStorage.getItem('portfolioScrollY');
    if (!saved) {
      window.scrollTo(0, 0);
      if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    } else if (parseInt(saved, 10) < 100 && location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  } catch (e) {}
})();
            `.trim(),
          }}
        />
        <header className="sticky top-0 z-20 bg-[var(--color-bg)]/80 backdrop-blur-md">
          <Navbar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
