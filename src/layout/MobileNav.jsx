import { routes } from "../constants/routes";

const mobileKeys = ["dashboard", "datav", "items", "materials", "help", "profile"];

export default function MobileNav({ current, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-6 border-t border-slate-100 bg-white/95 px-2 py-2 shadow-2xl backdrop-blur xl:hidden">
      {routes
        .filter((route) => mobileKeys.includes(route.key))
        .map((route) => {
          const Icon = route.icon;
          const active = current === route.key;
          return (
            <button
              key={route.key}
              onClick={() => onNavigate(route.key)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-bold transition ${
                active ? "bg-campus-orangeSoft text-campus-orange" : "text-campus-muted"
              }`}
            >
              <Icon size={19} />
              {route.label}
            </button>
          );
        })}
    </nav>
  );
}
