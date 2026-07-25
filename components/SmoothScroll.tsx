"use client";

import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enable CSS smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return <>{children}</>;
}
