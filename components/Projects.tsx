"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaLock } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Project {
  id: string;
  num: string;
  title: string;
  category: "ecommerce" | "ai" | "analytics";
  domain?: string;
  pitch: string;
  stack: string[];
  highlights: string[];
  link?: string;
  isPrivate?: boolean;
  metricPlaceholder?: string;
  tagline: string;
  accentGradient: string;
}

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "ecommerce" | "ai" | "analytics">("all");
  const [displayedFilter, setDisplayedFilter] = useState<"all" | "ecommerce" | "ai" | "analytics">("all");

  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isAnimatingTab = useRef(false);

  const projectsData: Project[] = [
    {
      id: "kaarvan",
      num: "01",
      title: "KAARVAN",
      category: "ecommerce",
      domain: "kaarvan.pk",
      tagline: "D2C E-Commerce & Gamified Checkout",
      pitch: "A D2C e-commerce store for premium fashion and utility bags, built specifically for the Pakistani market.",
      stack: ["Next.js 14", "React 18", "TypeScript", "MongoDB", "Zustand", "TanStack Query"],
      highlights: [
        "Built a gamified 'Mystery Vault' feature — users unlock custom discount codes",
        "Full admin dashboard: product/order/bundle/coupon management & analytics via Recharts",
        "Custom JWT auth system with Google OAuth integration",
        "Dark-charcoal-and-gold design system with a custom component library (no UI kit)",
      ],
      link: "https://kaarvan.pk",
      metricPlaceholder: "[ADD METRIC: e.g. Total Orders / Revenue Growth]",
      accentGradient: "linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(20, 20, 20, 0.8) 100%)",
    },
    {
      id: "allinone",
      num: "02",
      title: "AllInOne Store",
      category: "ecommerce",
      domain: "allinonestore.pk",
      tagline: "COD E-Commerce & WhatsApp Engine",
      pitch: "A COD-first e-commerce platform with deep WhatsApp integration for the Pakistani retail market.",
      stack: ["Next.js 16", "React 19", "Tailwind v4", "NextAuth v5", "MongoDB", "Cloudinary", "Meta CAPI"],
      highlights: [
        "15-model database schema covering products, orders, bundles, coupons, & abandoned-cart tracking",
        "Server-side Meta Conversions API (CAPI) integration alongside client-side Meta Pixel",
        "Custom analytics engine tracking visitor sessions and funnel conversion events",
        "Maroon-and-gold branded design system with Pakistani localization (province selector, PKR formatting, phone validation)",
      ],
      link: "https://allinonestore.pk",
      metricPlaceholder: "[ADD METRIC: e.g. Monthly Conversion Rate / Cart Recovery %]",
      accentGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 20, 20, 0.8) 100%)",
    },
    {
      id: "shipcart",
      num: "03",
      title: "ShipCart (Cartship)",
      category: "ecommerce",
      domain: "cartship.pk",
      tagline: "Gamified COD Storefront",
      pitch: "A COD-focused e-commerce store featuring a custom canvas-based promo experience.",
      stack: ["Next.js", "Vercel", "Canvas API", "REST APIs"],
      highlights: [
        "Diagnosed and resolved a live production DNS misconfiguration (A/CNAME records)",
        "Rebuilt a Spin-to-Win promo mechanic as a canvas-based Scratch Card, preserving backend prize logic",
      ],
      link: "https://cartship.pk",
      metricPlaceholder: "[ADD METRIC: e.g. Checkout Engagement / Coupon Redemption %]",
      accentGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(20, 20, 20, 0.8) 100%)",
    },
    {
      id: "swiftdailypicks",
      num: "04",
      title: "SwiftDailyPicks",
      category: "analytics",
      tagline: "MLB Expected-Value Analytics Platform",
      pitch: "An MLB-focused DFS analytics platform delivering sharper expected-value lines than standard sportsbook averaging.",
      stack: ["Next.js", "PM2", "OAuth 2.0", "DigitalOcean", "Ubuntu"],
      highlights: [
        "Designed a custom EV engine using a sharp-book reference line (Novig) instead of naive sportsbook averaging",
        "Shipped a full production OAuth subscription flow (DubClub) — paywall logic, DB migrations, post-purchase activation",
        "Optimized data loading via batched API calls and phased loading prioritizing upcoming games",
      ],
      isPrivate: true,
      metricPlaceholder: "[ADD METRIC: e.g. Daily Active Users / Line Accuracy %]",
      accentGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(20, 20, 20, 0.8) 100%)",
    },
    {
      id: "kodezi",
      num: "05",
      title: "Kodezi AI IDE",
      category: "ai",
      tagline: "Full-Stack AI Coding IDE",
      pitch: "An AI-powered coding IDE built end-to-end from scratch.",
      stack: ["Next.js (Full-Stack)", "Anthropic API (Claude)", "TypeScript", "Node.js"],
      highlights: [
        "Built the full IDE — frontend and backend architecture — from scratch",
        "Migrated the core AI integration from ChatGPT to the Anthropic Claude API and built custom IDE prompt tools",
      ],
      isPrivate: true,
      metricPlaceholder: "[ADD METRIC: e.g. Code Completion Latency / Active Developers]",
      accentGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(20, 20, 20, 0.8) 100%)",
    },
  ];

  const filteredProjects =
    displayedFilter === "all" ? projectsData : projectsData.filter((p) => p.category === displayedFilter);

  const handleFilterChange = (newFilter: "all" | "ecommerce" | "ai" | "analytics") => {
    if (newFilter === activeFilter || isAnimatingTab.current) return;
    setActiveFilter(newFilter);
    isAnimatingTab.current = true;

    const cards = listRef.current?.querySelectorAll(".editorial-project-row");
    if (!cards || cards.length === 0) {
      setDisplayedFilter(newFilter);
      isAnimatingTab.current = false;
      return;
    }

    gsap.to(cards, {
      opacity: 0,
      y: 15,
      duration: 0.22,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setDisplayedFilter(newFilter);
      },
    });
  };

  useGSAP(
    () => {
      const cards = listRef.current?.querySelectorAll(".editorial-project-row");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            onComplete: () => {
              isAnimatingTab.current = false;
            },
          }
        );
      } else {
        isAnimatingTab.current = false;
      }
    },
    { dependencies: [displayedFilter], scope: listRef }
  );

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="section-tag">
            <span>// 02. FEATURED WORK</span>
          </div>

          <div className="projects-title-wrap">
            <h2 className="projects-title">
              <span>Selected</span> Projects & <span>Case Studies</span>
            </h2>
            <p className="projects-subtitle">
              Production web applications, full-stack e-commerce platforms, and AI systems engineered for high performance.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="project-filter-tabs">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              All Work ({projectsData.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "ecommerce" ? "active" : ""}`}
              onClick={() => handleFilterChange("ecommerce")}
            >
              E-Commerce ({projectsData.filter((p) => p.category === "ecommerce").length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "analytics" ? "active" : ""}`}
              onClick={() => handleFilterChange("analytics")}
            >
              Analytics ({projectsData.filter((p) => p.category === "analytics").length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
              onClick={() => handleFilterChange("ai")}
            >
              AI Systems ({projectsData.filter((p) => p.category === "ai").length})
            </button>
          </div>
        </div>

        {/* Full-Width Editorial Rows Showcase */}
        <div ref={listRef} className="editorial-projects-list">
          {filteredProjects.map((project) => (
            <article key={project.id} className="editorial-project-row">
              <div className="row-ambient-background" style={{ background: project.accentGradient }}></div>

              <div className="row-content-grid">
                {/* Left Column: Index & Project Details */}
                <div className="row-left">
                  <div className="row-meta">
                    <span className="row-num">{project.num}</span>
                    <span className="row-tagline">{project.tagline}</span>
                  </div>

                  <h3 className="row-title">{project.title}</h3>
                  <p className="row-pitch">{project.pitch}</p>

                  {/* Tech Stack Pills */}
                  <div className="row-stack">
                    {project.stack.map((tech, idx) => (
                      <span key={idx} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Highlights */}
                  <ul className="row-highlights">
                    {project.highlights.map((item, idx) => (
                      <li key={idx}>
                        <span className="highlight-bullet">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Metric Placeholder */}
                  {project.metricPlaceholder && (
                    <div className="metric-placeholder-box">
                      <span className="metric-icon">⚡</span>
                      <span className="metric-text">{project.metricPlaceholder}</span>
                    </div>
                  )}
                </div>

                {/* Right Column: Visual Preview Panel & Action CTA */}
                <div className="row-right">
                  <div className="preview-panel">
                    <div className="panel-badge-bar">
                      {project.domain && <span className="domain-pill">{project.domain}</span>}
                      {project.isPrivate ? (
                        <span className="badge-private-pill">
                          <FaLock size={10} /> Private Project
                        </span>
                      ) : (
                        <span className="badge-live-pill">
                          <span className="live-dot-green"></span> Live Store
                        </span>
                      )}
                    </div>

                    <div className="panel-center-graphic">
                      <div className="graphic-symbol">{project.title.charAt(0)}</div>
                      <p className="graphic-title">{project.title}</p>
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="row-action">
                    {!project.isPrivate && project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="row-link-btn"
                      >
                        <span>Explore Live Store</span>
                        <FiArrowUpRight size={18} className="arrow-icon" />
                      </a>
                    ) : (
                      <div className="row-private-label">
                        <FaLock size={12} />
                        <span>Internal Client Architecture</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
