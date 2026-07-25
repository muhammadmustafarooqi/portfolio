"use client";

import React from "react";

export const Preloader: React.FC = () => {
  return (
    <div className="loader">
      {/* 5 Vertical Curtain Panels */}
      <div className="curtain-overlay">
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </div>

      {/* Main Preloader Content */}
      <div className="preloader-content">
        <div className="preloader-tag-wrap">
          <p className="preloader-tag">PORTFOLIO 2026</p>
        </div>

        <div className="preloader-name-wrap">
          <h1 className="preloader-name">
            <span>Muhammad</span> Mustafa Hussain
          </h1>
        </div>

        <div className="preloader-sub-wrap">
          <p className="preloader-sub">FULLSTACK DEVELOPER</p>
        </div>
      </div>

      {/* Bottom Corner Progress Counter */}
      <div className="preloader-counter">
        <span className="count-number">00</span>
        <span className="count-percent">%</span>
      </div>
    </div>
  );
};
