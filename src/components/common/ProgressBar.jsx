import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../animations/gsapSetup";

export default function ProgressBar({ value, className = "" }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(".progress-fill", { scaleX: 0 }, { scaleX: value / 100, duration: 0.75, transformOrigin: "left center" });
    },
    { scope, dependencies: [value], revertOnUpdate: true }
  );

  return (
    <div ref={scope} className={`h-2.5 overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div className="progress-fill h-full w-full origin-left rounded-full bg-campus-orange" />
    </div>
  );
}
