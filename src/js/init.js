
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

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  function homeSectionsAnimation() {

  //HOME - sections animations  
  const pinnedSection = document.querySelector(".features-wrapper");
  const sectionsContainer = document.querySelector(".inner-sections-container");  

  if (!pinnedSection || !sectionsContainer) return;

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
} 


// HOME - Dot orbit animation
function homeDotOrbitAnimation() {
  if (!document.querySelector(".animated-orbit")) return;

  document.querySelectorAll(".animated-orbit").forEach((svg, index) => {
    const dot = svg.querySelector(".moving-dot");
    const path = svg.querySelector(".orbit-path");

    // Motion path animation
    gsap.to(dot, {
      duration: 8,
      repeat: -1,
      ease: "none",
      motionPath: {
        path: path,
        align: path,
        alignOrigin: [0.5, 0.5],
        autoRotate: false
      }
    });

    // Opacity animation
    gsap.set(dot, { opacity: 1 });

    gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } })
      .to(dot, { opacity: 0, duration: 1 })
      .to({}, { duration: 3 })
      .to(dot, { opacity: 1, duration: 1 })
      .to({}, { duration: 3 });
  });
}

// Initialize animations
homeSectionsAnimation();
homeDotOrbitAnimation();
