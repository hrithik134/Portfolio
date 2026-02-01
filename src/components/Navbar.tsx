"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    } else {
      if (systemPrefersDark) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        setTheme("light");
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero");
      const heroHeight = heroElement?.offsetHeight || 0;
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const desktopNav = (
    <div className="hidden md:flex items-center w-full">
      <div className="flex-1">
        <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="block">
          <img src="/images/logo.png" alt="Portfolio" className="h-8 w-auto" />
        </a>
      </div>
      <div className="flex-1 flex justify-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-base text-[rgba(244,244,245,1)] hover:text-[var(--color-accent)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex-1 flex justify-end items-center gap-4">
        <a
          href="https://github.com/hrithik134/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-sm rounded-md border border-[var(--color-accent)] text-[var(--color-fg)] bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
        >
          Visit Repo
        </a>
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full hover:bg-[var(--color-muted)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="Toggle theme"
        >
          <div className="relative w-12 h-6 rounded-full flex items-center bg-slate-200 dark:bg-slate-700">
            <Sun
              className="w-3 h-3 text-yellow-500 absolute left-1"
              aria-hidden="true"
            />
            <Moon
              className="w-3 h-3 text-slate-200 absolute right-1"
              aria-hidden="true"
            />
            <div
              className={`absolute w-5 h-5 rounded-full bg-white dark:bg-slate-900 transition-transform duration-200 ${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <nav className="w-full py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
            <img src="/images/logo.png" alt="Portfolio" className="h-7 w-auto" />
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`w-full px-6 transition-colors ${
        isSticky
          ? "sticky top-0 z-50 navbar-glow bg-neutral-900/90 border-b border-[var(--color-muted)]/30 backdrop-blur-sm"
          : "relative bg-neutral-900/90"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 md:py-5 flex items-center justify-between">
        {desktopNav}

        <div className="md:hidden flex items-center gap-3 w-full justify-end">
          <a
            href="https://github.com/hrithik134/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm rounded-md border border-[var(--color-accent)] text-[var(--color-fg)] bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
          >
            Visit Repos
          </a>
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-[var(--color-muted)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            aria-label="Toggle theme"
          >
            <div className="relative w-12 h-6 rounded-full flex items-center bg-slate-200 dark:bg-slate-700">
              <Sun
                className="w-3 h-3 text-yellow-500 absolute left-1"
                aria-hidden="true"
              />
              <Moon
                className="w-3 h-3 text-slate-200 absolute right-1"
                aria-hidden="true"
              />
              <div
                className={`absolute w-5 h-5 rounded-full bg-white dark:bg-slate-900 transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded hover:bg-[var(--color-muted)]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-[var(--color-muted)]/20">
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm hover:text-[var(--color-accent)] transition-colors px-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
