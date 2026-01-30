"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  GraduationCap,
  Briefcase,
} from "lucide-react";

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
  const roles = [
    "AI & Machine Learning Engineer",
    "Problem Solver",
    "Manga Reader",
    "ML Enthusiast",
    "Tech Explorer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, startRotation: 0 });

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setRotation(0);
  }, [isDark]);

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

  useEffect(() => {
    setImageOpacity(1);
  }, []);

  const frontSrc = isDark ? "/images/2.jpeg" : "/images/1.jpeg";
  const backSrc = isDark ? "/images/1.jpeg" : "/images/2.jpeg";

  const startDrag = (clientX: number) => {
    dragRef.current = { active: true, startX: clientX, startRotation: rotation };
  };
  const onDragMove = (clientX: number) => {
    if (!dragRef.current.active) return;
    const d = (clientX - dragRef.current.startX) * 0.5;
    setRotation(dragRef.current.startRotation + d);
  };
  const endDrag = () => {
    dragRef.current.active = false;
  };

  const bindDrag = () => {
    const onMove = (e: MouseEvent) => onDragMove(e.clientX);
    const onUp = () => {
      endDrag();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };
  const bindTouch = () => {
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      onDragMove(e.touches[0].clientX);
    };
    const onEnd = () => {
      endDrag();
      window.removeEventListener("touchmove", onMove, { capture: true });
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("touchmove", onMove, { capture: true, passive: false });
    window.addEventListener("touchend", onEnd);
  };

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
      <section id="hero" className="relative min-h-screen flex items-center px-4">
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
                  href="/resume/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md text-base font-medium border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Resume</span>
                </a>
                <button
                  type="button"
                  title="Coming Soon"
                  className="inline-flex items-center justify-center px-4 py-3 rounded-md text-base font-medium border border-white/20 bg-black/5 dark:bg-white/10 backdrop-blur-md cursor-not-allowed"
                >
                  <img
                    src="/logos/nexus.png"
                    alt="Nexus logo"
                    className="w-5 h-5 block dark:hidden"
                  />
                  <img
                    src="/logos/nexus-inverted.png"
                    alt="Nexus logo"
                    className="w-[30px] h-5 hidden dark:block max-h-full"
                  />
                </button>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="flex-1 flex justify-center md:justify-end items-center">
              {shouldReduceMotion ? (
                <img
                  src={frontSrc}
                  alt="Profile"
                  className="w-full max-w-[400px] aspect-square rounded-full object-cover transition-opacity duration-[1.5s]"
                  style={{ opacity: imageOpacity, transform: "translate(-135px, -80px) scale(1.2)" }}
                />
              ) : (
                <div
                  className="relative w-full max-w-[400px] aspect-square select-none cursor-grab active:cursor-grabbing"
                  style={{
                    opacity: imageOpacity,
                    transition: "opacity 1.5s",
                    perspective: "1000px",
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    startDrag(e.clientX);
                    bindDrag();
                  }}
                  onTouchStart={(e) => {
                    startDrag(e.touches[0].clientX);
                    bindTouch();
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden [transform-style:preserve-3d]"
                    style={{
                      transform: `translate(-135px, -80px) scale(1.2) rotateY(${rotation}deg)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden [backface-visibility:hidden]"
                      style={{ transform: "rotateY(0deg)" }}
                    >
                      <img
                        src={frontSrc}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden [backface-visibility:hidden]"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <img
                        src={backSrc}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-28 text-center text-sm text-muted-foreground opacity-70">
          Scroll to explore
        </div>
      </section>

      <AnimatedSection
        id="about"
        className="pt-6 pb-24 px-4 scroll-mt-24"
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
                  <Brain className="w-5 h-5" />
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
                    <div className="text-sm"> Years Coding</div>
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
                  <GraduationCap className="w-5 h-5" />
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
                  <Code2 className="w-5 h-5" />
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
                  <Briefcase className="w-5 h-5" />
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
        className="pt-8 pb-5 flex items-center px-0 scroll-mt-24 overflow-x-hidden"
        reduceMotion={!!shouldReduceMotion}
      >
        <div className="w-full">
          <LogoSlider items={skills} />
        </div>
      </AnimatedSection>

      <AnimatedSection
        id="projects"
        className="py-20 px-4 scroll-mt-24"
        reduceMotion={!!shouldReduceMotion}
      >
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
      </AnimatedSection>

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
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[var(--color-accent)] text-white rounded hover:opacity-90"
          >
            View Resume
          </a>
        </div>
      </section>

      <AnimatedSection
        id="contact"
        className="py-20 flex items-center px-4 scroll-mt-24"
        reduceMotion={!!shouldReduceMotion}
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
      </AnimatedSection>
    </main>
  );
}
