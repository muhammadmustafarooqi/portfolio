"use client";

import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp, FaPaperPlane } from "react-icons/fa6";

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-tag">
          <span>// 03. GET IN TOUCH</span>
        </div>

        <div className="contact-content-grid">
          <div className="contact-info">
            <h2 className="contact-title">
              Let's Build Something <span>Extraordinary</span>
            </h2>
            <p className="contact-desc">
              Have a project in mind, an opportunity, or looking for a Full-Stack Engineer to ship production-ready applications? Let's connect.
            </p>

            <div className="contact-methods">
              <a href="mailto:muhammadmustafafarooqi.296@gmail.com" className="contact-card">
                <div className="contact-card-icon">
                  <FaEnvelope size={20} />
                </div>
                <div className="contact-card-text">
                  <span>Direct Email</span>
                  <p>muhammadmustafafarooqi.296@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/923362601166" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon">
                  <FaWhatsapp size={20} />
                </div>
                <div className="contact-card-text">
                  <span>WhatsApp Chat</span>
                  <p>+92 336 2601166</p>
                </div>
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub Profile">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn Profile">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="contact-form-wrap">
            <form onSubmit={(e) => e.preventDefault()} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" placeholder="Muhammad Ali" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" placeholder="ali@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea id="message" rows={4} placeholder="Tell me about your web app or project requirements..." required></textarea>
              </div>
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bar */}
        <footer className="footer-bar">
          <p>© {new Date().getFullYear()} Muhammad Mustafa Hussain. All rights reserved.</p>
          <p className="footer-built">Engineered with Next.js 14 & GSAP</p>
        </footer>
      </div>
    </section>
  );
};
