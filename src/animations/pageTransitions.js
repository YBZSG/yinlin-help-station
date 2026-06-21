import { gsap } from "./gsapSetup";

export function animatePageEnter(scope) {
  return gsap.fromTo(
    scope.querySelectorAll(".page-motion"),
    { autoAlpha: 0, y: 18 },
    { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }
  );
}
