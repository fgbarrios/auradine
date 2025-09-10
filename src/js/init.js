
  import Lenis from "lenis";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  gsap.registerPlugin(ScrollTrigger);

  //sections animations
  
  const pinnedSection = document.querySelector(".features-wrapper");
  const sectionsContainer = document.querySelector(".inner-sections-container");
  

  //move the "inner-sections-container" up as we scroll down (100vh per section)
  gsap.to(sectionsContainer, {
    y: "-100%",
    ease: "none",
    scrollTrigger: {
      trigger: pinnedSection,
      start: "top top",
      end: "+=" + window.innerHeight * 3, //3 sections
      pin: true,
      pinSpacing: false,
      scrub: 1,
      markers: true,
    },
  });


// Dot orbit animation
gsap.registerPlugin(MotionPathPlugin);

// === 1. Path motion ===
gsap.to("#moving-dot", {
  duration: 8,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: "#orbit-path",
    align: "#orbit-path",
    alignOrigin: [0.5, 0.5],
    autoRotate: false,
    markers: true
  }
});

// === 2. Opacity animation (separate timeline) ===
gsap.set("#moving-dot", { opacity: 1 }); // start visible

gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } })
  .to("#moving-dot", { opacity: 0, duration: 1 }) // fade out
  .to({}, { duration: 3 })                        // stay hidden
  .to("#moving-dot", { opacity: 1, duration: 1 }) // fade in
  .to({}, { duration: 3 });                       // stay visible
