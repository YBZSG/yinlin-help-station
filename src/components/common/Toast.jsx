import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap } from "../../animations/gsapSetup";

export default function Toast({ message, onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!message) return;
    gsap.fromTo(ref.current, { autoAlpha: 0, y: -12, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.25 });
    const timer = window.setTimeout(() => {
      gsap.to(ref.current, { autoAlpha: 0, y: -10, duration: 0.2, onComplete: onDone });
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [message, onDone]);

  if (!message) return null;

  return (
    <div ref={ref} className="fixed right-5 top-5 z-[60] flex items-center gap-2 rounded-2xl bg-campus-ink px-4 py-3 text-sm font-semibold text-white shadow-2xl">
      <CheckCircle2 size={18} className="text-emerald-300" />
      {message}
    </div>
  );
}
