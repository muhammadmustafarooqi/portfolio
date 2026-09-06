"use client";

import React, { useState, useEffect } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      {/* Brand Logo */}
      <div className="logo">
        <a href="#" className="logo-link">
          <span className="logo-mark">M</span>
          <span className="logo-name">
            Muhammad <span>Mustafa</span>
          </span>
        </a>
      </div>

      {/* Floating Glass Center Menu */}
      <div className="nav-menu">
        <a href="#about" className="nav-item">
          About
        </a>
        <a href="#projects" className="nav-item">
          Projects
        </a>
        <a href="#experience" className="nav-item">
          Experience
        </a>
        <a href="#contact" className="nav-item">
          Contact
        </a>
      </div>

      {/* Premium Action CTA Button */}
      <div className="nav-cta">
        <a href="#contact" className="cta-button">
          <span>Let's Talk</span>
          <div className="cta-button-icon">
            <IoArrowForwardOutline size={16} />
          </div>
        </a>
      </div>
    </nav>
  );
};
