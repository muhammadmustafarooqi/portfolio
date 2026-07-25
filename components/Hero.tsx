"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoArrowForwardOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import img1 from "../assets/istockphoto-1462119292-2048x2048.jpg";
import img2 from "../assets/muthia-ashifa-salsabella-NXEi84bhtq0-unsplash.jpg";
import img3 from "../assets/istockphoto-2172442212-2048x2048.jpg";
import img4 from "../assets/image.jpg";

const heroImages = [img1, img2, img3, img4];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
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
      {/* Background Image Carousel */}
      <div className="hero-img-slider">
        <div className="hero-overlay-vignette"></div>
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <Image
              src={img}
              alt={`Showcase Image ${index + 1}`}
              priority={index === 0}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}

        {/* Carousel Navigation & Counter */}
        <div className="hero-slider-controls">
          <button onClick={prevSlide} className="slider-arrow" aria-label="Previous Slide">
            <IoChevronBackOutline size={15} />
          </button>
          <div className="slider-counter">
            <span>0{currentSlide + 1}</span> / <span>0{heroImages.length}</span>
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
              <span>Crafting</span> digital,
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

      <div className="cta">
        <div className="cta-lable">
          <p>Explore Projects</p>
        </div>
        <div className="cta-icon">
          <IoArrowForwardOutline size={22} />
        </div>
      </div>
    </>
  );
};