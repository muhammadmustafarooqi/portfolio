document.addEventListener("DOMContentLoaded", () => {
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
        // Zoom out active hero background slide
        gsap.to(".hero-slide.active", {
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

  // Hero Background Carousel Script
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  const slideNumEl = document.getElementById("slide-num");
  let currentIdx = 0;

  function updateSlide(newIdx) {
    slides[currentIdx].classList.remove("active");
    currentIdx = (newIdx + slides.length) % slides.length;
    slides[currentIdx].classList.add("active");
    if (slideNumEl) {
      slideNumEl.textContent = String(currentIdx + 1).padStart(2, "0");
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => updateSlide(currentIdx + 1));
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => updateSlide(currentIdx - 1));
  }

  setInterval(() => {
    updateSlide(currentIdx + 1);
  }, 4500);
});
