import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { countUp } from "../../animations/countUp";
import Card from "../common/Card";

export default function StatCard({ label, value, icon: Icon, tone = "green", onClick }) {
  const numberRef = useRef(null);
  const scope = useRef(null);
  const toneClass = tone === "blue" ? "bg-campus-blueSoft text-campus-blue" : tone === "orange" ? "bg-campus-orangeSoft text-amber-700" : "bg-campus-greenSoft text-campus-green";

  useGSAP(() => countUp(numberRef.current, value), { scope, dependencies: [value], revertOnUpdate: true });

  return (
    <div ref={scope}>
      <Card as="button" type="button" onClick={onClick} className="gsap-reveal block w-full text-left transition hover:-translate-y-0.5 hover:shadow-lift">
        <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-campus-muted">{label}</p>
          <p ref={numberRef} className="mt-2 text-3xl font-black text-campus-ink">0</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneClass}`}>
          <Icon size={23} />
        </div>
        </div>
      </Card>
    </div>
  );
}
