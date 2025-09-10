
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, MotionPathPlugin } from "gsap/all";


const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);


/* ------------------------  FUNCTIONS ------------------------ */
/* ------------------------  FUNCTIONS ------------------------ */
/* ------------------------  FUNCTIONS ------------------------ */
function homeSectionsAnimation() {
  const pinnedSection = document.querySelector(".features-wrapper");
  const sectionsContainer = document.querySelector(".inner-sections-container");
  const sections = gsap.utils.toArray(".inner-sections-container .section");

  if (!pinnedSection || !sectionsContainer || sections.length === 0) return;

  const totalSections = sections.length;

  const totalScrollHeight = (sectionsContainer.scrollHeight - window.innerHeight) + 200;

  gsap.to(sectionsContainer, {
    y: -totalScrollHeight,
    ease: "none",
    scrollTrigger: {
      trigger: pinnedSection,
      start: "top top",
      end: "+=" + totalScrollHeight,
      scrub: 1,
      pin: true,
      pinSpacing: false,
      //markers: true,
    },
  });


  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => section.classList.add("active"),
      onLeaveBack: () => section.classList.remove("active"),
    });
  });

}



// HOME - Dot orbit animation
function homeDotOrbitAnimation() {
  if (!document.querySelector(".animated-orbit")) return;

  document.querySelectorAll(".animated-orbit").forEach((svg, index) => {
    const dot = svg.querySelector(".moving-dot");
    const path = svg.querySelector(".orbit-path");

    if (!dot || !path) return;

    let randomDelay = Math.random() * 2; // Random delay between 0 and 2 seconds

    setTimeout(() => {
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
        
    }, randomDelay * 1000); // ⬅️ delay in milliseconds
  });
}


function showFromTheRightAnimation(element, stack = false, duration = 1.5) {
  if (!document.querySelector(element)) return;

  if (stack) {
    gsap.fromTo(element, 
      { x: 100, opacity: 0, filter: "blur(10px)" },
      { x: 0, opacity: 1, filter: "blur(0px)", duration: duration, stagger: 0.2 }
    );
    return;
  }

  gsap.fromTo(element, 
    { x: 100, opacity: 0, filter: "blur(10px)" },
    { x: 0, opacity: 1, filter: "blur(0px)", duration: duration }
  );
}

function clipShowFromTheRightAnimation(element, duration = 1.5) {
  if (!document.querySelector(element)) return;

  gsap.fromTo(element, 
    { x: 100, opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
    { x: 0, opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" , duration: duration }
  );
}


function showFromTheBottomAnimation(element, stack = false, duration = 2) {
  if (!document.querySelector(element)) return;

  if (stack) {
    gsap.fromTo(element, 
      { y: 100, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: duration, stagger: 0.2 }
    );
    return;
  }

  gsap.fromTo(element, 
    { y: 100, opacity: 0, filter: "blur(10px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: duration }
  );
}

function textShowFromTheRightAnimation(element, stack = false, duration = 1.5, splitType = 'words', useClipPath = false) {
  const target = document.querySelector(element);
  if (!target) return;

  document.fonts.ready.then(() => {
    let split;

    if (splitType === 'words') {
      split = new SplitText(target, {
        type: 'words',
        wordsClass: 'word'
      });
    } else {
      split = new SplitText(target, {
        type: splitType,
        wordsClass: 'word',
        charsClass: 'char'
      });
    }

    // Select the parts to animate based on split type
    const elementsToAnimate = splitType === 'chars' ? split.chars : split.words;

    gsap.fromTo(elementsToAnimate,
      { 
        x: 100, 
        filter: "blur(20px)", 
        opacity: 0,
        clipPath: useClipPath ? "polygon(0 0, 0 0, 0 100%, 0% 100%)" : "",
      },
      {
        x: 0,
        filter: "blur(0px)",
        opacity: 1,
        clipPath: useClipPath ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)": "",
        duration: duration,
        stagger: stack ? 0.2 : 0,
        ease: "power2.out"
      }
    );
  });
}

function textShowFromTheBottomAnimation(element, stack = false, duration = 2, splitType = 'words', useClipPath = false) {
  const target = document.querySelector(element);
  if (!target) return;

  document.fonts.ready.then(() => {
    let split;

    if (splitType === 'words') {
      split = new SplitText(target, {
        type: 'words',
        wordsClass: 'word'
      });
    } else {
      split = new SplitText(target, {
        type: splitType,
        wordsClass: 'word',
        charsClass: 'char'
      });
    }

    // Select the parts to animate based on split type
    const elementsToAnimate = splitType === 'chars' ? split.chars : split.words;

    gsap.fromTo(elementsToAnimate,
      { 
        y: 100, 
        filter: "blur(20px)", 
        opacity: 0,
        clipPath: useClipPath ? "polygon(0 0, 0 0, 0 100%, 0% 100%)" : "",
      },
      {
        y: 0,
        filter: "blur(0px)",
        opacity: 1,
        clipPath: useClipPath ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)": "",
        duration: duration,
        stagger: stack ? 0.2 : 0,
        ease: "power2.out"
      }
    );
  });
}



/* ----------------------- FUNCTION CALLS ----------------------- */
/* ----------------------- FUNCTION CALLS ----------------------- */
/* ----------------------- FUNCTION CALLS ----------------------- */
showFromTheRightAnimation('.logo-container > *', true);
showFromTheRightAnimation('#nav-menu li', true);
textShowFromTheRightAnimation('h1', true, 1.5,'words', true);
textShowFromTheRightAnimation('.hero p', true, 1.5);

//buttons animation (text + svg)
clipShowFromTheRightAnimation('header .anim-wrapper');
clipShowFromTheRightAnimation('.hero .anim-wrapper');


homeSectionsAnimation();
homeDotOrbitAnimation();
