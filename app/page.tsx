"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => console.log("Preloader sequence finished"),
      });

      // 1. Reveal preloader text elements
      tl.to([".preloader-tag", ".preloader-name", ".preloader-sub"], {
        y: "0%",
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Animate counter from 0 to 100
      const counterObj = { value: 0 };
      const numberEl = document.querySelector(".count-number");

      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (numberEl) {
              const formatted = Math.floor(counterObj.value)
                .toString()
                .padStart(2, "0");
              numberEl.textContent = formatted;
            }
          },
        },
        "-=0.6"
      );

      // 3. Fade/Slide out preloader content & counter
      tl.to(
        [".preloader-content", ".preloader-counter"],
        {
          opacity: 0,
          y: -25,
          duration: 0.6,
          ease: "power2.in",
        },
        "+=0.2"
      );

      // 4. Stagger lift vertical panels (curtain effect)
      tl.to(
        ".panel",
        {
          y: "-100%",
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.inOut",
          onStart: () => {
            // Zoom out hero background image
            gsap.to(".hero-img", {
              scale: 1,
              duration: 1.8,
              ease: "power3.out",
            });
          },
        },
        "-=0.2"
      );

      // 5. Reveal hero content and navbar
      tl.to(
        ".nav",
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );

      tl.to(
        [".line h1", ".line p"],
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=1"
      );

      tl.to(
        ".cta",
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );

      tl.to(
        ".cta-icon",
        {
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

      tl.to(
        ".cta-lable p",
        {
          y: "0%",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef}>
      <Preloader />
      <div className="container">
        <Navbar />
        <Hero />
      </div>
      <About />
    </main>
  );
}
