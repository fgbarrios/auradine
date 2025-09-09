import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollToPlugin, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  smooth: true,
  lerp: 0.1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Example ScrollTrigger animation
gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});
