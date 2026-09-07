"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaLock, FaChevronDown, FaArrowRightLong } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { EffectCoverflow, Mousewheel, Pagination } from "swiper/modules";

// Swiper CSS styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

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
  bgSymbol: string;
}

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "ecommerce" | "ai" | "analytics">("all");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  // Dual Touch Listener: handles both Vertical (scroll up/down) & Horizontal (swipe left/right) on mobile
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null || touchStartX.current === null || !swiperRef.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;

    const diffY = touchStartY.current - touchEndY; // Positive = Swiped UP (scrolling down)
    const diffX = touchStartX.current - touchEndX; // Positive = Swiped LEFT

    const swiper = swiperRef.current;
    const isFirst = swiper.isBeginning;
    const isLast = swiper.isEnd;

    // Threshold of 35px to trigger slide transition
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 35) {
      // Vertical gesture (finger moving UP = scroll DOWN; finger moving DOWN = scroll UP)
      if (diffY > 0 && !isLast) {
        swiper.slideNext();
      } else if (diffY < 0 && !isFirst) {
        swiper.slidePrev();
      }
    } else if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      // Horizontal gesture
      if (diffX > 0 && !isLast) {
        swiper.slideNext();
      } else if (diffX < 0 && !isFirst) {
        swiper.slidePrev();
      }
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

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
      accentGradient: "linear-gradient(135deg, rgba(217, 119, 6, 0.25) 0%, rgba(20, 20, 20, 0.95) 100%)",
      bgSymbol: "K",
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
      accentGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(20, 20, 20, 0.95) 100%)",
      bgSymbol: "A",
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
      accentGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(20, 20, 20, 0.95) 100%)",
      bgSymbol: "S",
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
      accentGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(20, 20, 20, 0.95) 100%)",
      bgSymbol: "P",
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
      accentGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(20, 20, 20, 0.95) 100%)",
      bgSymbol: "AI",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  // GSAP animation triggered on active slide transition start (matching landing-27)
  const triggerSlideAnimations = (swiper: SwiperClass) => {
    setActiveSlideIndex(swiper.activeIndex);
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const num = activeSlide.querySelector(".row-num");
    const tagline = activeSlide.querySelector(".row-tagline");
    const title = activeSlide.querySelector(".row-title");
    const pitch = activeSlide.querySelector(".row-pitch");
    const stackPills = activeSlide.querySelectorAll(".tech-pill");
    const highlights = activeSlide.querySelectorAll(".row-highlights li");
    const preview = activeSlide.querySelector(".preview-panel");
    const actionBtn = activeSlide.querySelector(".row-action");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (num) {
      tl.fromTo(num, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0);
    }
    if (tagline) {
      tl.fromTo(tagline, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);
    }
    if (title) {
      tl.fromTo(title, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 0.15);
    }
    if (pitch) {
      tl.fromTo(pitch, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.25);
    }
    if (stackPills && stackPills.length > 0) {
      tl.fromTo(
        stackPills,
        { y: 20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 },
        0.35
      );
    }
    if (highlights && highlights.length > 0) {
      tl.fromTo(
        highlights,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.45
      );
    }
    if (preview) {
      tl.fromTo(preview, { y: 60, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.9 }, 0.2);
    }
    if (actionBtn) {
      tl.fromTo(actionBtn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.55);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="section-tag">
            <span>// 02. FEATURED WORK (VERTICAL 3D COVERFLOW)</span>
          </div>

          <div className="projects-title-wrap">
            <h2 className="projects-title">
              <span>Selected</span> Projects & <span>Case Studies</span>
            </h2>
            <p className="projects-subtitle">
              Scroll vertically to explore full-stack platforms with interactive 3D transitions & micro-animations.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="project-filter-tabs">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Work ({projectsData.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "ecommerce" ? "active" : ""}`}
              onClick={() => setActiveFilter("ecommerce")}
            >
              E-Commerce ({projectsData.filter((p) => p.category === "ecommerce").length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "analytics" ? "active" : ""}`}
              onClick={() => setActiveFilter("analytics")}
            >
              Analytics ({projectsData.filter((p) => p.category === "analytics").length})
            </button>
            <button
              className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
              onClick={() => setActiveFilter("ai")}
            >
              AI Systems ({projectsData.filter((p) => p.category === "ai").length})
            </button>
          </div>
        </div>

        {/* 3D Vertical/Horizontal Swiper Container */}
        <div
          className="projects-swiper-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Swiper
            key={isMobile ? "mobile-swiper" : "desktop-swiper"}
            direction={isMobile ? "horizontal" : "vertical"}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            speed={1100}
            mousewheel={{
              releaseOnEdges: true,
              thresholdDelta: 15,
            }}
            coverflowEffect={{
              rotate: isMobile ? 15 : 35,
              stretch: 0,
              depth: isMobile ? 60 : 140,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Mousewheel, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              triggerSlideAnimations(swiper);
            }}
            onSlideChangeTransitionStart={(swiper) => {
              triggerSlideAnimations(swiper);
            }}
            className="projects-swiper"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id} className="editorial-project-slide">
                <article className="editorial-project-row">
                  <div
                    className="row-ambient-background"
                    style={{ background: project.accentGradient }}
                  ></div>

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
                          <div className="graphic-symbol">{project.bgSymbol}</div>
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Sleek Vertical Step Progress Pagination */}
          <div className="projects-step-pagination">
            {filteredProjects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => swiperRef.current?.slideTo(idx)}
                className={`step-btn ${activeSlideIndex === idx ? "active" : ""}`}
                title={proj.title}
                aria-label={`Go to slide ${proj.num}`}
              >
                <span className="step-num">{proj.num}</span>
                <span className="step-bar"></span>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll / Swipe Indicator */}
        <div className="projects-scroll-hint">
          {isMobile ? (
            <>
              <span>Swipe Horizontally</span>
              <FaArrowRightLong className="scroll-arrow-anim" size={12} />
            </>
          ) : (
            <>
              <span>Scroll Down</span>
              <FaChevronDown className="scroll-arrow-anim" size={12} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
