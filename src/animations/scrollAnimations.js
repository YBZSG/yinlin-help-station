import { gsap, ScrollTrigger } from "./gsapSetup";

export function setupScrollReveal(selector, scope) {
  const elements = scope.querySelectorAll(selector);
  if (!elements.length) return [];

  return ScrollTrigger.batch(elements, {
    start: "top 86%",
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(batch, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.55 });
    }
  });
}
