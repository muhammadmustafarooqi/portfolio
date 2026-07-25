"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { FaCode, FaServer, FaDatabase, FaGraduationCap, FaBriefcase, FaPlug, FaBrain, FaRocket, FaAward, FaBolt } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "api" | "tools">("all");
  const [displayedTab, setDisplayedTab] = useState<"all" | "frontend" | "backend" | "api" | "tools">("all");

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isAnimatingTab = useRef(false);

  const skills = [
    // Frontend
    { name: "React", category: "frontend", level: "Core Stack", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js 14", category: "frontend", level: "Core Stack", icon: SiNextdotjs, color: "#ffffff" },
    { name: "JavaScript (ES6+)", category: "frontend", level: "Expert", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", category: "frontend", level: "Proficient", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", category: "frontend", level: "Core Stack", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Redux Toolkit", category: "frontend", level: "Proficient", icon: SiRedux, color: "#764ABC" },

    // Backend
    { name: "Node.js", category: "backend", level: "Core Stack", icon: SiNodedotjs, color: "#339933" },
    { name: "Express.js", category: "backend", level: "Core Stack", icon: SiExpress, color: "#ffffff" },
    { name: "REST APIs", category: "backend", level: "Expert", icon: FaServer, color: "#38BDF8" },
    { name: "PostgreSQL", category: "backend", level: "Proficient", icon: SiPostgresql, color: "#4169E1" },
    { name: "PM2", category: "backend", level: "Proficient", icon: SiPm2, color: "#2B037A" },
    { name: "OAuth 2.0", category: "backend", level: "Proficient", icon: SiAuth0, color: "#EB5424" },

    // API & Integrations
    { name: "Anthropic API (Claude)", category: "api", level: "Proficient", icon: FaBrain, color: "#D97706" },
    { name: "Gemini API", category: "api", level: "Proficient", icon: SiGoogle, color: "#8E75FF" },
    { name: "Meta Pixel & CAPI", category: "api", level: "Proficient", icon: SiMeta, color: "#0081FB" },

    // DB, DevOps & Tools
    { name: "MongoDB", category: "tools", level: "Core Stack", icon: SiMongodb, color: "#47A248" },
    { name: "Docker", category: "tools", level: "Proficient", icon: SiDocker, color: "#2496ED" },
    { name: "DigitalOcean", category: "tools", level: "Proficient", icon: SiDigitalocean, color: "#0080FF" },
    { name: "Vercel Deployment (Domains/DNS)", category: "tools", level: "Expert", icon: SiVercel, color: "#ffffff" },
    { name: "Git & GitHub", category: "tools", level: "Expert", icon: SiGit, color: "#F05032" },
    { name: "Postman", category: "tools", level: "Proficient", icon: SiPostman, color: "#FF6C37" },
  ];

  const filteredSkills = displayedTab === "all" ? skills : skills.filter((s) => s.category === displayedTab);

  // Tab switching with exit -> enter animation sequence
  const handleTabChange = (newTab: "all" | "frontend" | "backend" | "api" | "tools") => {
    if (newTab === activeTab || isAnimatingTab.current) return;
    setActiveTab(newTab);
    isAnimatingTab.current = true;

    const cards = gridRef.current?.querySelectorAll(".skill-card");
    if (!cards || cards.length === 0) {
      setDisplayedTab(newTab);
      isAnimatingTab.current = false;
      return;
    }

    // Animate current cards OUT first
    gsap.to(cards, {
      opacity: 0,
      scale: 0.85,
      y: -10,
      rotateX: -15,
      duration: 0.22,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        setDisplayedTab(newTab);
      },
    });
  };

  // Animate new cards IN after state update
  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".skill-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.85, y: 20, rotateX: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
            onComplete: () => {
              isAnimatingTab.current = false;
            },
          }
        );
      } else {
        isAnimatingTab.current = false;
      }
    },
    { dependencies: [displayedTab], scope: gridRef }
  );

  // ScrollTrigger Animations
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // 1. Stats Counter ScrollTrigger
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
              { opacity: 0, y: 30, scale: 0.9 },
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

      // 2. Word Reveal for Title
      const titleWords = sectionRef.current?.querySelectorAll(".word-reveal");
      if (titleWords && titleWords.length > 0) {
        gsap.fromTo(
          titleWords,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 3. Initial Grid 3D Perspective Entrance
      if (gridRef.current) {
        gsap.set(gridRef.current, { perspective: 1000 });
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 85%",
          onEnter: () => {
            const cards = gridRef.current?.querySelectorAll(".skill-card");
            if (cards) {
              gsap.fromTo(
                cards,
                { opacity: 0, rotateX: 25, y: 30, scale: 0.9 },
                {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  stagger: 0.04,
                  ease: "power3.out",
                }
              );
            }
          },
          once: true,
        });
      }
    },
    { scope: sectionRef }
  );

  // Mouse tilt handler for skill cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.25,
      ease: "power1.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-container">
        {/* Section Tag */}
        <div className="section-tag">
          <span>// 01. ABOUT & TECHNICAL SKILLS</span>
        </div>

        {/* Executive Highlights Stats Bar */}
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

        <div className="about-grid">
          {/* Left Column: Story */}
          <div className="about-story">
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

            <p className="about-desc">
              I am a <strong>Full-Stack Software Engineer</strong> specializing in the MERN Stack (MongoDB, Express, React, Node.js) and Next.js, with hands-on software house experience shipping production web applications at <strong>PotentiasDev</strong> and <strong>QF Network</strong>.
            </p>

            <p className="about-desc">
              Currently pursuing my BS in Computer Science at <strong>Virtual University of Pakistan</strong>, I bridge the gap between high-end interactive front-end design systems and scalable, secure backend API architecture.
            </p>

            {/* Experience & Education Cards */}
            <div className="experience-cards">
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

          {/* Right Column: Skills Arsenal */}
          <div className="skills-container">
            <div className="skills-header">
              <h3>Technical Arsenal</h3>
              {/* Category Filter Tabs */}
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

            {/* Animated Skills Grid */}
            <div ref={gridRef} className="skills-grid">
              {filteredSkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="skill-card"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="skill-icon-wrap" style={{ color: skill.color }}>
                      <IconComponent size={24} />
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
