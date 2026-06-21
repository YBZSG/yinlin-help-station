import { gsap } from "./gsapSetup";

export function countUp(target, endValue, options = {}) {
  if (!target) return null;
  const state = { value: 0 };
  return gsap.to(state, {
    value: endValue,
    duration: options.duration || 1,
    ease: "power1.out",
    onUpdate: () => {
      target.textContent = Math.round(state.value).toLocaleString("zh-CN");
    }
  });
}
