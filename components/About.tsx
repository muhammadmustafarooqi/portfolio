"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiPostman,
  SiRedux,
  SiJavascript,
  SiVercel,
  SiPostgresql,
  SiPm2,
  SiDocker,
  SiDigitalocean,
  SiMeta,
  SiGoogle,
  SiAuth0,
} from "react-icons/si";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaGraduationCap,
  FaBriefcase,
  FaPlug,
  FaBrain,
  FaRocket,
  FaAward,
  FaBolt,
  FaStar,
} from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
}

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "api" | "tools">("all");
  const [displayedTab, setDisplayedTab] = useState<"all" | "frontend" | "backend" | "api" | "tools">("all");

  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isAnimatingTab = useRef(false);
  const isSectionActive = useRef(true);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);

  // quickTo setters map for magnetic cursor proximity
  const quickSettersRef = useRef<{
    x: ReturnType<typeof gsap.quickTo>[];
    y: ReturnType<typeof gsap.quickTo>[];
    scale: ReturnType<typeof gsap.quickTo>[];
  }>({ x: [], y: [], scale: [] });

  const skills = [
    // Frontend
    { name: "React", category: "frontend", level: "Core Stack", icon: SiReact, color: "#61DAFB", prominent: true },
    { name: "Next.js 14", category: "frontend", level: "Core Stack", icon: SiNextdotjs, color: "#ffffff", prominent: true },
    { name: "JavaScript (ES6+)", category: "frontend", level: "Expert", icon: SiJavascript, color: "#F7DF1E", prominent: true },
    { name: "TypeScript", category: "frontend", level: "Proficient", icon: SiTypescript, color: "#3178C6", prominent: false },
    { name: "Tailwind CSS", category: "frontend", level: "Core Stack", icon: SiTailwindcss, color: "#06B6D4", prominent: true },
    { name: "Redux Toolkit", category: "frontend", level: "Proficient", icon: SiRedux, color: "#764ABC", prominent: false },

    // Backend
    { name: "Node.js", category: "backend", level: "Core Stack", icon: SiNodedotjs, color: "#339933", prominent: true },
    { name: "Express.js", category: "backend", level: "Core Stack", icon: SiExpress, color: "#ffffff", prominent: true },
    { name: "REST APIs", category: "backend", level: "Expert", icon: FaServer, color: "#38BDF8", prominent: true },
    { name: "PostgreSQL", category: "backend", level: "Proficient", icon: SiPostgresql, color: "#4169E1", prominent: false },
    { name: "PM2", category: "backend", level: "Proficient", icon: SiPm2, color: "#2B037A", prominent: false },
    { name: "OAuth 2.0", category: "backend", level: "Proficient", icon: SiAuth0, color: "#EB5424", prominent: false },

    // API & Integrations
    { name: "Anthropic API (Claude)", category: "api", level: "Proficient", icon: FaBrain, color: "#D97706", prominent: true },
    { name: "Gemini API", category: "api", level: "Proficient", icon: SiGoogle, color: "#8E75FF", prominent: false },
    { name: "Meta Pixel & CAPI", category: "api", level: "Proficient", icon: SiMeta, color: "#0081FB", prominent: false },

    // DB, DevOps & Tools
    { name: "MongoDB", category: "tools", level: "Core Stack", icon: SiMongodb, color: "#47A248", prominent: true },
    { name: "Docker", category: "tools", level: "Proficient", icon: SiDocker, color: "#2496ED", prominent: false },
    { name: "DigitalOcean", category: "tools", level: "Proficient", icon: SiDigitalocean, color: "#0080FF", prominent: false },
    { name: "Vercel Deployment", category: "tools", level: "Expert", icon: SiVercel, color: "#ffffff", prominent: true },
    { name: "Git & GitHub", category: "tools", level: "Expert", icon: SiGit, color: "#F05032", prominent: true },
    { name: "Postman", category: "tools", level: "Proficient", icon: SiPostman, color: "#FF6C37", prominent: false },
  ];

  const filteredSkills = displayedTab === "all" ? skills : skills.filter((s) => s.category === displayedTab);

  // Initialize GSAP quickTo setters for continuous performant cursor tracking
  const initQuickSetters = () => {
    if (typeof window === "undefined" || window.innerWidth <= 900) return;
    const container = galleryRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".living-skill-card");
    const settersX: ReturnType<typeof gsap.quickTo>[] = [];
    const settersY: ReturnType<typeof gsap.quickTo>[] = [];
    const settersScale: ReturnType<typeof gsap.quickTo>[] = [];

    cards.forEach((card) => {
      settersX.push(gsap.quickTo(card, "x", { duration: 0.35, ease: "power2.out" }));
      settersY.push(gsap.quickTo(card, "y", { duration: 0.35, ease: "power2.out" }));
      settersScale.push(gsap.quickTo(card, "scale", { duration: 0.35, ease: "power2.out" }));
    });

    quickSettersRef.current = { x: settersX, y: settersY, scale: settersScale };
  };

  // NEW CONCEPT 3: FLIP FILTER TRANSITIONS FOR TAB SWITCHING
  const handleTabChange = (newTab: "all" | "frontend" | "backend" | "api" | "tools") => {
    if (newTab === activeTab || isAnimatingTab.current) return;
    isAnimatingTab.current = true;
    setActiveTab(newTab);

    const container = galleryRef.current;
    if (!container) {
      setDisplayedTab(newTab);
      isAnimatingTab.current = false;
      return;
    }

    const currentCards = container.querySelectorAll(".living-skill-card");
    const state = Flip.getState(currentCards);

    setDisplayedTab(newTab);

    requestAnimationFrame(() => {
      const updatedCards = container.querySelectorAll(".living-skill-card");
      Flip.from(state, {
        targets: updatedCards,
        duration: 0.5,
        ease: "power3.inOut",
        stagger: 0.02,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)", stagger: 0.02 }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.25, ease: "power2.in" }),
        onComplete: () => {
          isAnimatingTab.current = false;
          initQuickSetters();
        },
      });
    });
  };

  // NEW CONCEPT 5: Performant Magnetic Proximity Mouse Movement Listener using quickTo()
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 900 || !isSectionActive.current) return;
    const container = galleryRef.current;
    if (!container) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const radius = 160;

    const cards = container.querySelectorAll(".living-skill-card");
    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distX = mouseX - cardCenterX;
      const distY = mouseY - cardCenterY;
      const dist = Math.hypot(distX, distY);

      if (dist < radius && quickSettersRef.current.x[idx]) {
        const factor = 1 - dist / radius;
        const moveX = distX * factor * 0.12;
        const moveY = distY * factor * 0.12;
        const scaleBoost = 1 + factor * 0.05;

        quickSettersRef.current.x[idx](moveX);
        quickSettersRef.current.y[idx](moveY);
        quickSettersRef.current.scale[idx](scaleBoost);
      } else if (quickSettersRef.current.x[idx]) {
        quickSettersRef.current.x[idx](0);
        quickSettersRef.current.y[idx](0);
        quickSettersRef.current.scale[idx](1);
      }
    });
  };

  const handleContainerMouseLeave = () => {
    if (window.innerWidth <= 900) return;
    quickSettersRef.current.x.forEach((setX) => setX && setX(0));
    quickSettersRef.current.y.forEach((setY) => setY && setY(0));
    quickSettersRef.current.scale.forEach((setScale) => setScale && setScale(1));
  };

  // GSAP matchMedia Architecture & Living Skills Grid Animations
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Reduced Motion: Simple opacity fades only
      if (prefersReducedMotion) {
        if (tagRef.current) {
          gsap.fromTo(
            tagRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, scrollTrigger: { trigger: tagRef.current, start: "top 90%" } }
          );
        }

        if (statsRef.current) {
          const cards = statsRef.current.querySelectorAll(".stat-card");
          gsap.fromTo(
            cards,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, scrollTrigger: { trigger: statsRef.current, start: "top 85%" } }
          );
          const statTargets = [
            { selector: ".stat-val-1", target: 2, suffix: "+" },
            { selector: ".stat-val-2", target: 15, suffix: "+" },
            { selector: ".stat-val-3", target: 99, suffix: "%" },
          ];
          statTargets.forEach((item) => {
            const el = statsRef.current?.querySelector(item.selector);
            if (el) el.textContent = `${String(item.target).padStart(2, "0")}${item.suffix}`;
          });
        }

        if (galleryRef.current) {
          const cards = galleryRef.current.querySelectorAll(".living-skill-card");
          gsap.fromTo(
            cards,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, scrollTrigger: { trigger: galleryRef.current, start: "top 85%" } }
          );
        }
        return;
      }

      // ==========================================
      // DESKTOP BREAKPOINT (min-width: 901px)
      // ==========================================
      mm.add("(min-width: 901px)", () => {
        // Section Label
        if (tagRef.current) {
          gsap.fromTo(
            tagRef.current,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: tagRef.current, start: "top 90%", once: true },
            }
          );
        }

        // Stats Bar Stagger & Count Up
        if (statsRef.current) {
          const statCards = statsRef.current.querySelectorAll(".stat-card");
          const statTargets = [
            { selector: ".stat-val-1", target: 2, suffix: "+" },
            { selector: ".stat-val-2", target: 15, suffix: "+" },
            { selector: ".stat-val-3", target: 99, suffix: "%" },
          ];

          ScrollTrigger.create({
            trigger: statsRef.current,
            start: "top 85%",
            onEnter: () => {
              gsap.fromTo(
                statCards,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
              );

              statTargets.forEach((item) => {
                const el = statsRef.current?.querySelector(item.selector);
                if (el) {
                  const obj = { val: 0 };
                  gsap.to(obj, {
                    val: item.target,
                    duration: 1.8,
                    ease: "power2.out",
                    onUpdate: () => {
                      const formatted = Math.floor(obj.val).toString().padStart(2, "0");
                      el.textContent = `${formatted}${item.suffix}`;
                    },
                  });
                }
              });
            },
            once: true,
          });
        }

        // Headline & Bio
        if (storyRef.current) {
          const titleWords = storyRef.current.querySelectorAll(".word-reveal");
          const paragraphs = storyRef.current.querySelectorAll(".about-desc");
          const highlights = storyRef.current.querySelectorAll(".about-desc strong");

          if (titleWords.length > 0) {
            gsap.fromTo(
              titleWords,
              { y: "100%", opacity: 0 },
              {
                y: "0%",
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: storyRef.current, start: "top 80%", once: true },
              }
            );
          }

          if (paragraphs.length > 0) {
            gsap.fromTo(
              paragraphs,
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: { trigger: storyRef.current, start: "top 75%", once: true },
              }
            );
          }

          if (highlights.length > 0) {
            gsap.fromTo(
              highlights,
              { color: "rgba(255, 255, 255, 0.7)", textShadow: "0 0 0px rgba(255,255,255,0)" },
              {
                color: "#ffffff",
                textShadow: "0 0 12px rgba(255, 255, 255, 0.35)",
                duration: 0.6,
                stagger: 0.08,
                delay: 0.3,
                ease: "power2.out",
                scrollTrigger: { trigger: storyRef.current, start: "top 75%", once: true },
              }
            );
          }
        }

        // Experience Cards
        if (expRef.current) {
          const expCards = expRef.current.querySelectorAll(".exp-card");
          gsap.fromTo(
            expCards,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: { trigger: expRef.current, start: "top 85%", once: true },
            }
          );
        }

        // NEW CONCEPT 2 & 4: ORGANIC SCATTERED ASSEMBLY ENTRANCE & IDLE AMBIENT FLOATING (Desktop)
        if (galleryRef.current) {
          const cards = galleryRef.current.querySelectorAll(".living-skill-card");

          ScrollTrigger.create({
            trigger: galleryRef.current,
            start: "top 85%",
            onEnter: () => {
              // 2. Organic Scattered Entrance
              gsap.fromTo(
                cards,
                {
                  opacity: 0,
                  x: () => (Math.random() - 0.5) * 80,
                  y: () => (Math.random() - 0.5) * 80,
                  rotation: () => (Math.random() - 0.5) * 14,
                  scale: 0.85,
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  duration: 0.7,
                  stagger: { amount: 0.5, from: "random" },
                  ease: "back.out(1.4)",
                  onComplete: () => {
                    initQuickSetters();

                    // 4. Idle Ambient Floating Motion
                    floatTweensRef.current.forEach((t) => t.kill());
                    floatTweensRef.current = [];

                    cards.forEach((card, idx) => {
                      const floatTween = gsap.to(card, {
                        y: "+=4",
                        duration: 3.5 + (idx % 4) * 0.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: (idx % 5) * 0.2,
                      });
                      floatTweensRef.current.push(floatTween);
                    });
                  },
                }
              );
            },
            onLeave: () => {
              isSectionActive.current = false;
              floatTweensRef.current.forEach((t) => t.pause());
            },
            onEnterBack: () => {
              isSectionActive.current = true;
              floatTweensRef.current.forEach((t) => t.play());
            },
            onLeaveBack: () => {
              isSectionActive.current = false;
              floatTweensRef.current.forEach((t) => t.pause());
            },
            once: true,
          });
        }
      });

      // ==========================================
      // MOBILE BREAKPOINT (max-width: 900px)
      // ==========================================
      mm.add("(max-width: 900px)", () => {
        if (tagRef.current) {
          gsap.fromTo(
            tagRef.current,
            { opacity: 0, x: -15 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: tagRef.current, start: "top 92%", once: true },
            }
          );
        }

        if (statsRef.current) {
          const statCards = statsRef.current.querySelectorAll(".stat-card");
          const statTargets = [
            { selector: ".stat-val-1", target: 2, suffix: "+" },
            { selector: ".stat-val-2", target: 15, suffix: "+" },
            { selector: ".stat-val-3", target: 99, suffix: "%" },
          ];

          ScrollTrigger.create({
            trigger: statsRef.current,
            start: "top 88%",
            onEnter: () => {
              gsap.fromTo(
                statCards,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }
              );

              statTargets.forEach((item) => {
                const el = statsRef.current?.querySelector(item.selector);
                if (el) {
                  const obj = { val: 0 };
                  gsap.to(obj, {
                    val: item.target,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: () => {
                      const formatted = Math.floor(obj.val).toString().padStart(2, "0");
                      el.textContent = `${formatted}${item.suffix}`;
                    },
                  });
                }
              });
            },
            once: true,
          });
        }

        if (storyRef.current) {
          const titleWords = storyRef.current.querySelectorAll(".word-reveal");
          const paragraphs = storyRef.current.querySelectorAll(".about-desc");
          const highlights = storyRef.current.querySelectorAll(".about-desc strong");

          if (titleWords.length > 0) {
            gsap.fromTo(
              titleWords,
              { y: "100%", opacity: 0 },
              {
                y: "0%",
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: { trigger: storyRef.current, start: "top 85%", once: true },
              }
            );
          }

          if (paragraphs.length > 0) {
            gsap.fromTo(
              paragraphs,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: { trigger: storyRef.current, start: "top 80%", once: true },
              }
            );
          }

          if (highlights.length > 0) {
            gsap.fromTo(
              highlights,
              { color: "rgba(255, 255, 255, 0.7)" },
              {
                color: "#ffffff",
                duration: 0.5,
                stagger: 0.06,
                delay: 0.2,
                ease: "power2.out",
                scrollTrigger: { trigger: storyRef.current, start: "top 80%", once: true },
              }
            );
          }
        }

        if (expRef.current) {
          const expCards = expRef.current.querySelectorAll(".exp-card");
          gsap.fromTo(
            expCards,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: expRef.current, start: "top 88%", once: true },
            }
          );
        }

        // NEW CONCEPT 6: MOBILE SCATTERED ENTRANCE (Snappy, reduced jitter, no idle loops/magnetic)
        if (galleryRef.current) {
          const skillCards = galleryRef.current.querySelectorAll(".living-skill-card");
          if (skillCards.length > 0) {
            gsap.fromTo(
              skillCards,
              {
                opacity: 0,
                x: () => (Math.random() - 0.5) * 30,
                y: () => (Math.random() - 0.5) * 30,
                scale: 0.9,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.45,
                stagger: { amount: 0.35, from: "random" },
                ease: "power2.out",
                scrollTrigger: { trigger: galleryRef.current, start: "top 85%", once: true },
              }
            );
          }
        }
      });

      return () => {
        floatTweensRef.current.forEach((t) => t.kill());
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-container">
        {/* ELEMENT 1: SECTION LABEL */}
        <div ref={tagRef} className="section-tag">
          <span>// 01. ABOUT & TECHNICAL SKILLS</span>
        </div>

        {/* ELEMENT 2: EXECUTIVE STATS BAR */}
        <div ref={statsRef} className="stats-row">
          <div className="stat-card">
            <div className="stat-icon"><FaBriefcase /></div>
            <div className="stat-data">
              <h3 className="stat-val-1">00+</h3>
              <p>Years Software House Exp.</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><FaRocket /></div>
            <div className="stat-data">
              <h3 className="stat-val-2">00+</h3>
              <p>Web Products Shipped</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><FaBolt /></div>
            <div className="stat-data">
              <h3 className="stat-val-3">00%</h3>
              <p>Performance & Clean Code</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><FaAward /></div>
            <div className="stat-data">
              <h3>BS CS</h3>
              <p>Virtual University Pakistan</p>
            </div>
          </div>
        </div>

        {/* ELEMENT 3: CONTINUOUS MARQUEE TICKER */}
        <div className="brand-marquee-wrap">
          <div className="brand-marquee-track">
            <span>FULL-STACK ENGINEER &nbsp;✦&nbsp; MERN STACK &nbsp;✦&nbsp; NEXT.JS 14 &nbsp;✦&nbsp; GSAP ANIMATIONS &nbsp;✦&nbsp; POTENTIASDEV & QF NETWORK &nbsp;✦&nbsp; VIRTUAL UNIVERSITY CS &nbsp;✦&nbsp;</span>
            <span>FULL-STACK ENGINEER &nbsp;✦&nbsp; MERN STACK &nbsp;✦&nbsp; NEXT.JS 14 &nbsp;✦&nbsp; GSAP ANIMATIONS &nbsp;✦&nbsp; POTENTIASDEV & QF NETWORK &nbsp;✦&nbsp; VIRTUAL UNIVERSITY CS &nbsp;✦&nbsp;</span>
          </div>
        </div>

        <div className="about-grid">
          {/* Left Column: Story */}
          <div ref={storyRef} className="about-story">
            {/* ELEMENT 4: HEADLINE */}
            <h2 className="about-title">
              <span className="title-line">
                <span className="word-reveal">Engineered</span>{" "}
                <span className="word-reveal">for</span>{" "}
                <span className="word-reveal">Performance</span>
              </span>{" "}
              <span className="title-line">
                <span className="word-reveal">&</span>{" "}
                <span className="word-reveal"><span>Scale</span></span>
              </span>
            </h2>

            {/* ELEMENT 5: BIO PARAGRAPHS */}
            <p className="about-desc">
              I am a <strong>Full-Stack Software Engineer</strong> specializing in the MERN Stack (MongoDB, Express, React, Node.js) and Next.js, with hands-on software house experience shipping production web applications at <strong>PotentiasDev</strong> and <strong>QF Network</strong>.
            </p>

            <p className="about-desc">
              Currently pursuing my BS in Computer Science at <strong>Virtual University of Pakistan</strong>, I bridge the gap between high-end interactive front-end design systems and scalable, secure backend API architecture.
            </p>

            {/* ELEMENT 6: EXPERIENCE/EDUCATION CARDS */}
            <div id="experience" ref={expRef} className="experience-cards">
              <div className="exp-card">
                <div className="exp-icon">
                  <FaBriefcase />
                </div>
                <div className="exp-info">
                  <h4>PotentiasDev & QF Network</h4>
                  <p>Software House & Agency Experience</p>
                </div>
              </div>

              <div className="exp-card">
                <div className="exp-icon">
                  <FaGraduationCap />
                </div>
                <div className="exp-info">
                  <h4>BS Computer Science</h4>
                  <p>Virtual University of Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: LIVING SKILLS GRID ARCHITECTURE */}
          <div className="living-skills-container">
            <div className="skills-header">
              <h3>Technical Arsenal</h3>
              {/* ELEMENT 7: CATEGORY FILTER TABS */}
              <div className="skills-tabs">
                <button
                  className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => handleTabChange("all")}
                >
                  All
                </button>
                <button
                  className={`tab-btn ${activeTab === "frontend" ? "active" : ""}`}
                  onClick={() => handleTabChange("frontend")}
                >
                  <FaCode className="tab-icon" /> Frontend
                </button>
                <button
                  className={`tab-btn ${activeTab === "backend" ? "active" : ""}`}
                  onClick={() => handleTabChange("backend")}
                >
                  <FaServer className="tab-icon" /> Backend
                </button>
                <button
                  className={`tab-btn ${activeTab === "api" ? "active" : ""}`}
                  onClick={() => handleTabChange("api")}
                >
                  <FaPlug className="tab-icon" /> API & AI
                </button>
                <button
                  className={`tab-btn ${activeTab === "tools" ? "active" : ""}`}
                  onClick={() => handleTabChange("tools")}
                >
                  <FaDatabase className="tab-icon" /> DB & DevOps
                </button>
              </div>
            </div>

            {/* NEW CONCEPT: LIVING SKILLS GRID WITH PROXIMITY & FLIP TRANSITIONS */}
            <div
              ref={galleryRef}
              className="living-skills-grid"
              onMouseMove={handleContainerMouseMove}
              onMouseLeave={handleContainerMouseLeave}
            >
              {filteredSkills.map((skill) => {
                const IconComp = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className={`living-skill-card ${skill.prominent ? "prominent" : ""}`}
                    style={
                      {
                        "--accent-color": skill.color,
                        "--accent-glow": `${skill.color}33`,
                      } as React.CSSProperties
                    }
                  >
                    {skill.prominent && (
                      <span className="featured-pill">
                        <FaStar size={8} style={{ display: "inline", marginRight: "3px" }} /> Featured
                      </span>
                    )}
                    <div className="skill-icon-wrap" style={{ color: skill.color }}>
                      <IconComp size={24} />
                    </div>
                    <div className="skill-details">
                      <h4>{skill.name}</h4>
                      <span className="skill-badge">{skill.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
