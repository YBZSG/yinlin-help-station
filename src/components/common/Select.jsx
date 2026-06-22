import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../animations/gsapSetup";
import { ChevronDown } from "lucide-react";

export default function Select({ label, options = [], className = "", value, onChange, ...props }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (open && listRef.current) {
        gsap.fromTo(listRef.current, { autoAlpha: 0, y: -6, scaleY: 0.96 }, { autoAlpha: 1, y: 0, scaleY: 1, duration: 0.22, ease: "power3.out" });
      }
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
        setHovered(-1);
      }
    }

    function handleDocumentKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setHovered(-1);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [open]);

  function selectOption(option) {
    onChange({ target: { value: option } });
    setOpen(false);
    setHovered(-1);
  }

  function handleKeyDown(e) {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHovered((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHovered((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && hovered >= 0) {
      selectOption(options[hovered]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setHovered(-1);
    }
  }

  return (
    <label className={`block ${open ? "relative z-50" : ""}`} ref={containerRef}>
      {label ? <span className="mb-1.5 block text-sm font-semibold text-campus-ink">{label}</span> : null}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          className={`flex h-12 w-full items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-left text-base font-bold text-campus-ink outline-none transition focus:border-campus-orange focus:ring-4 focus:ring-orange-100 ${className}`}
          {...props}
        >
          <span>{value || "请选择"}</span>
          <ChevronDown size={18} className={`shrink-0 text-campus-muted transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute left-0 top-full z-[60] mt-2 w-full rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
            style={{ maxHeight: "12rem", overflowY: "auto" }}
          >
            {options.map((option, i) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option === value}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(-1)}
                  className={`block w-full rounded-xl px-4 py-3 text-left text-base font-bold transition ${
                    option === value
                      ? "bg-campus-orangeSoft text-campus-orange"
                      : i === hovered
                        ? "bg-slate-50 text-campus-ink"
                        : "text-campus-muted"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </label>
  );
}
