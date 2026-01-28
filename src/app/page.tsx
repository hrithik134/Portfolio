"use client";

import LogoSlider from "@/components/LogoSlider";
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
} from "lucide-react";

export default function Home() {
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
    },
  ];

  return (
    <main>
      <section id="hero" className="relative min-h-[80vh] flex items-center px-4">
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
            <div className="flex-1 max-w-xl space-y-3">
              <div>
                <h1 className="text-2xl font-bold">
                  Hello<span className="text-[var(--color-accent)]">.</span>
                </h1>
                <div className="w-fit border-b-2 border-[var(--color-accent)] mt-2"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold">
                I&apos;m Hrithik S
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
                AI & Machine Learning Engineer
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://github.com/hrithik134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium border border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:opacity-90"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href="/resume/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Resume</span>
                </a>
                <button
                  type="button"
                  title="Coming Soon"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-medium border border-white/20 bg-black/5 dark:bg-white/10 backdrop-blur-md cursor-not-allowed"
                >
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  <span>Nexus</span>
                </button>
              </div>
            </div>
            {/* Right Column - Image Placeholder */}
            <div className="flex-1 flex justify-center md:justify-end items-center">
              <div className="w-full max-w-[320px] aspect-square rounded-full bg-[var(--color-muted)]/10"></div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-sm text-muted-foreground opacity-70">
          Scroll to explore
        </div>
      </section>

      <section id="about" className="pt-6 pb-24 px-4 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto w-full space-y-4">
          <h2
            className="text-2xl md:text-3xl font-heading font-bold text-center"
            style={{ fontSize: "40px" }}
          >
            About Me
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-left">
            I entered software development through machine learning and
            data-driven problem solving. Since then, I’ve focused on building AI
            systems that are not just accurate, but reliable and practical to
            deploy. I enjoy learning deeply and turning ideas into working
            systems.
          </p>
          <p className="text-base md:text-lg text-muted-foreground text-left">
          As a final-year student, I’m actively exploring emerging areas in AI, particularly Generative AI, 
          with a focus on LLM orchestration, prompt engineering, and system-level integration. I enjoy experimenting 
          across domains and continuously expanding my skill set to build more capable and scalable AI solutions.
          </p>
        </div>
      </section>

      <section
        id="skills"
        className="pt-8 pb-5 flex items-center px-0 scroll-mt-24 overflow-x-hidden"
      >
        <div className="w-full">
          <LogoSlider items={skills} />
        </div>
      </section>

      <section id="projects" className="py-20 px-4 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Projects
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              A collection of projects I&apos;ve built to showcase my skills
              and experience.
            </p>
      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <article
                key={project.title}
                className="p-6 border border-[var(--color-muted)]/20 rounded space-y-4 flex flex-col"
              >
                <h3 className="text-xl font-heading font-bold">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-[var(--color-muted)]/10 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-accent)] hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
          target="_blank"
          rel="noopener noreferrer"
                      className="text-sm text-[var(--color-accent)] hover:underline"
                    >
                      Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="resume"
        className="py-20 flex items-center px-4 scroll-mt-24"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            Resume
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Download my resume to learn more about my experience and skills.
          </p>
        <a
            href="/resume/resume.pdf"
            download
            className="inline-block px-6 py-3 bg-[var(--color-accent)] text-white rounded hover:opacity-90"
          >
            Download Resume
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 flex items-center px-4 scroll-mt-24"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            Contact
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            You can reach me at:
          </p>
          <div className="space-y-4">
        <a
              href="mailto:hrithiksrine5297@gmail.com"
              className="text-base md:text-lg text-[var(--color-accent)] hover:underline"
            >
              hrithiksrine5297@gmail.com
            </a>
            <div className="flex gap-6 justify-center flex-wrap">
              <a
                href="https://github.com/hrithik134"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg text-[var(--color-accent)] hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/hrithiks134/"
          target="_blank"
          rel="noopener noreferrer"
                className="text-base md:text-lg text-[var(--color-accent)] hover:underline"
              >
                LinkedIn
              </a>
        <a
                href="https://leetcode.com/username"
          target="_blank"
          rel="noopener noreferrer"
                className="text-base md:text-lg text-[var(--color-accent)] hover:underline"
              >
                LeetCode
        </a>
      </div>
          </div>
        </div>
      </section>
    </main>
  );
}
