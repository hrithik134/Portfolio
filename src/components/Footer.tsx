"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const iconContainer =
  "w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-[#0F172A] dark:border-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_#0F766E] dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent";

export default function Footer() {
  return (
    <footer className="w-full bg-white/5 dark:bg-white/5 border-t border-t-[#0F172A] dark:border-t-white/10 backdrop-blur-md shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
            <p className="italic font-light text-slate-900 dark:text-white/60 max-w-md">
              &ldquo;Sometimes, the hardest thing to do is nothing. But
              that&apos;s the most powerful thing you can do.&rdquo;
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://github.com/hrithik134"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconContainer}
            >
              <FaGithub className="w-5 h-5 text-slate-900 dark:text-white/80" />
            </a>
            <a
              href="https://www.linkedin.com/in/hrithiks134/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconContainer}
            >
              <FaLinkedin className="w-5 h-5 text-slate-900 dark:text-white/80" />
            </a>
            <a
              href="mailto:"
              aria-label="Email"
              className={iconContainer}
            >
              {/* Light mode: email icon in black, Dark mode: email icon in white */}
              <FaEnvelope className="w-5 h-5 text-[#0F172A] dark:text-white/80" />
            </a>
            <a
              href="https://leetcode.com/u/hrithiksrine5297/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className={iconContainer}
            >
              <SiLeetcode className="w-5 h-5 text-slate-900 dark:text-white/80" />
            </a>
            <button
              type="button"
              aria-label="Open Nexus Card"
              className={iconContainer}
              onClick={() => {
                if (typeof document === "undefined") return;
                const trigger = document.getElementById("nexus-trigger");
                if (trigger && trigger instanceof HTMLButtonElement) {
                  trigger.click();
                }
              }}
            >
              {/* Light mode: nexus.png, Dark mode: nexus-inverted.png */}
              <img
                src="/logos/nexus.png"
                alt="NEXUS logo"
                className="w-5 h-5 object-contain block dark:hidden"
              />
              <img
                src="/logos/nexus-inverted.png"
                alt="NEXUS logo"
                className="w-5 h-5 object-contain hidden dark:block"
              />
            </button>
          </div>
        </div>
        <div className="h-px bg-[#0F172A] dark:bg-white/10 my-8 w-full" />
        <p className="text-center text-sm text-slate-900 dark:text-white/60">
          © 2026 Hrithik S. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
