"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoArrowForwardOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const heroImages = [
  "/New folder (2)/01_portfolio_photo.png",
  "/New folder (2)/03_portfolio_photo.png",
  "/New folder (2)/05_portfolio_photo.png",
  "/New folder (2)/06_portfolio_photo.png",
  "/New folder (2)/08_portfolio_photo.png",
  "/New folder (2)/10_portfolio_photo.png",
  "/New folder (2)/13_portfolio_photo.png",
  "/New folder (2)/15_portfolio_photo.png",
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play interval for background slider (changes slide every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <>
      {/* Background Image Carousel with Fade & Zoom Animation */}
      <div className="hero-img-slider">
        <div className="hero-overlay-vignette"></div>
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <Image
              src={img}
              alt={`Portfolio Showcase ${index + 1}`}
              priority={index === 0}
              unoptimized
              fill
              sizes="100vw"
              className="hero-img"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}

        {/* Carousel Navigation Controls & Counter */}
        <div className="hero-slider-controls">
          <button onClick={prevSlide} className="slider-arrow" aria-label="Previous Slide">
            <IoChevronBackOutline size={15} />
          </button>
          <div className="slider-counter">
            <span className="slider-counter-num">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>{" "}
            / <span>{String(heroImages.length).padStart(2, "0")}</span>
          </div>
          <button onClick={nextSlide} className="slider-arrow" aria-label="Next Slide">
            <IoChevronForwardOutline size={15} />
          </button>
        </div>
      </div>

      <div className="header">
        <div className="hero-copy">
          <div className="line">
            <h1>
              <span>Crafting</span> digital
            </h1>
          </div>
          <div className="line">
            <h1>
              experiences with <span>Precision</span>
            </h1>
          </div>
        </div>
        <div className="line">
          <p>Full-Stack Engineer specializing in MERN Stack, Next.js & Creative Web Animations</p>
        </div>
      </div>

      <a href="#projects" className="cta">
        <div className="cta-lable">
          <p>Explore Projects</p>
        </div>
        <div className="cta-icon">
          <IoArrowForwardOutline size={22} />
        </div>
      </a>
    </>
  );
};