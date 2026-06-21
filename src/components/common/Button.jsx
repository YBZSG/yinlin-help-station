import { useRef } from "react";
import { gsap } from "../../animations/gsapSetup";

const variants = {
  primary: "bg-campus-orange text-white shadow-lift hover:bg-orange-600",
  secondary: "bg-campus-blueSoft text-campus-blue hover:bg-blue-100",
  warm: "bg-campus-orangeSoft text-amber-700 hover:bg-orange-100",
  ghost: "bg-white text-campus-ink border border-slate-200 hover:border-campus-orange hover:text-campus-orange",
  danger: "bg-red-50 text-red-600 hover:bg-red-100"
};

export default function Button({ children, variant = "primary", className = "", icon: Icon, ...props }) {
  const ref = useRef(null);

  function pulse() {
    gsap.fromTo(ref.current, { scale: 0.96 }, { scale: 1, duration: 0.22, ease: "back.out(2)" });
  }

  return (
    <button
      ref={ref}
      type="button"
      onMouseDown={pulse}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {Icon ? <Icon size={18} strokeWidth={2.2} /> : null}
      {children}
    </button>
  );
}
