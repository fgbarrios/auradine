
  import Lenis from "lenis";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

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
