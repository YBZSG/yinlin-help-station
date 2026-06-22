import { useRef } from "react";
import { PhoneCall, ShieldCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../animations/gsapSetup";
import Button from "../common/Button";

export default function HeroSection({ onNavigate }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { duration: 0.55, ease: "power2.out" } });
      tl.from(".hero-title", { autoAlpha: 0, y: 22 })
        .from(".hero-copy", { autoAlpha: 0, y: 14 }, "<0.08")
        .from(".hero-action", { autoAlpha: 0, y: 12, stagger: 0.06 }, "<0.1");
      gsap.to(".floating-soft", { y: -8, rotation: 1.5, repeat: -1, yoyo: true, duration: 2.6, ease: "sine.inOut" });
    },
    { scope }
  );

  return (
    <section ref={scope} className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-soft md:p-8">
      <div className="absolute right-4 top-4 hidden h-24 w-24 rounded-full bg-campus-orangeSoft md:block" />
      <div className="grid items-center gap-6 md:grid-cols-[1.4fr_.8fr]">
        <div>
          <span className="hero-title inline-block rounded-full bg-campus-orangeSoft px-3 py-1 text-xs font-bold text-campus-orange">银邻互助站 · 温暖社区</span>
          <h2 className="hero-title mt-3 text-2xl font-black leading-tight text-campus-ink sm:text-3xl md:text-4xl">一个按钮发布求助，一群邻里及时回应。</h2>
          <p className="hero-copy mt-4 max-w-2xl text-sm leading-7 text-campus-muted sm:text-base sm:leading-8">
            代买药品、陪同就医、上门关怀、活动陪伴，都能在这里找到帮助。让社区里的每一位老人，都能被及时看见和温暖回应。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="hero-action" icon={PhoneCall} onClick={() => onNavigate("emergency")}>一键求助</Button>
            <Button className="hero-action" variant="secondary" icon={ShieldCheck} onClick={() => onNavigate("items")}>借用物品</Button>
          </div>
        </div>
        <div className="floating-soft relative mx-auto w-full max-w-md">
          <img src="/mock-images/hero-community-simple.svg" alt="社区老人互助关怀插画" className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lift" />
        </div>
      </div>
    </section>
  );
}
