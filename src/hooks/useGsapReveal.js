import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export function useGsapReveal(dependencies = []) {
  const scope = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-reveal",
        { autoAlpha: 0, y: 18, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: "power2.out" }
      );
    },
    { scope, dependencies, revertOnUpdate: true }
  );

  return scope;
}
