import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../animations/gsapSetup";
import Button from "./Button";

export default function Modal({ open, title, children, onClose }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (!open) return;
      gsap.fromTo(".modal-panel", { autoAlpha: 0, y: 22, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "back.out(1.6)" });
      gsap.fromTo(".modal-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
    },
    { scope, dependencies: [open], revertOnUpdate: true }
  );

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div ref={scope} className="fixed inset-0 z-[100] grid place-items-center px-4 py-6 sm:px-6">
      <div className="modal-backdrop absolute inset-0 bg-campus-ink/25 backdrop-blur-sm" onClick={onClose} />
      <div className="modal-panel relative max-h-[min(78vh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-campus-ink">{title}</h2>
          <Button variant="ghost" className="h-9 min-h-9 w-9 px-0" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
