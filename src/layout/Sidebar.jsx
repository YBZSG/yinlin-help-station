import { useRef, useState } from "react";
import { Building2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import { routes } from "../constants/routes";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

export default function Sidebar({ current, onNavigate }) {
  const scope = useRef(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(".active-indicator", { scaleY: 0.5, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.25, ease: "power2.out" });
    },
    { scope, dependencies: [current], revertOnUpdate: true }
  );

  return (
    <aside ref={scope} className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur xl:block">
      <div className="mb-8 rounded-2xl bg-white px-2 py-3 shadow-sm">
        <img src="/brand-logo.png" alt="银邻互助站 - 温暖关怀，邻里互助" className="h-14 w-full object-contain" />
      </div>

      <nav className="space-y-2">
        {routes.map((route) => {
          const Icon = route.icon;
          const active = current === route.key || (current === "search" && route.key === "dashboard");
          return (
            <button
              key={route.key}
              onClick={() => onNavigate(route.key)}
              className={`relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                active ? "bg-campus-greenSoft text-campus-green" : "text-campus-muted hover:bg-slate-50 hover:text-campus-ink"
              }`}
            >
              {active ? <span className="active-indicator absolute left-0 h-7 w-1 rounded-r-full bg-campus-green" /> : null}
              <Icon size={19} strokeWidth={2.25} />
              {route.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 overflow-hidden rounded-2xl bg-gradient-to-br from-campus-orangeSoft to-campus-greenSoft p-4">
        <Building2 className="mb-3 text-campus-orange" size={26} />
        <p className="text-sm font-black text-campus-ink">共建温暖社区</p>
        <p className="mt-1 text-xs leading-5 text-campus-muted">让社区里每一位老人，都能被及时看见和温暖回应。</p>
        <button type="button" onClick={() => setAboutOpen(true)} className="mt-3 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-campus-orange shadow-sm">
          了解更多
        </button>
      </div>
      <Modal open={aboutOpen} title="共建温暖社区" onClose={() => setAboutOpen(false)}>
        <div className="space-y-4">
          <p className="text-sm leading-7 text-campus-muted">
            银邻互助站把适老物品共享、健康资料、生活互助、临时关怀和志愿服务集中在一个入口里，让社区老人之间的帮助更容易被看见、被响应、被记录。
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {["共享物品", "响应求助", "参与志愿"].map((item) => (
              <div key={item} className="rounded-2xl bg-campus-orangeSoft p-4 text-center text-sm font-black text-campus-orange">
                {item}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setAboutOpen(false)}>知道了</Button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}
