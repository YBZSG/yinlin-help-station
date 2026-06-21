import { gsap } from "./gsapSetup";

export function popElement(target) {
  if (!target) return;
  gsap.fromTo(target, { scale: 0.96 }, { scale: 1, duration: 0.28, ease: "back.out(2)" });
}

export function highlightElement(target) {
  if (!target) return;
  gsap.fromTo(target, { y: -2, boxShadow: "0 0 0 rgba(47,158,126,0)" }, { y: 0, boxShadow: "0 18px 50px rgba(47,158,126,.18)", duration: 0.4 });
}
