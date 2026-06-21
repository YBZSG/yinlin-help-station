import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import { Bell, ChevronDown, Clock3, MapPin, Search } from "lucide-react";
import { mockUser } from "../data/mockUser";
import { regions } from "../utils/region";

export default function Topbar({
  title,
  onNavigate,
  onSearch,
  region,
  onRegionChange,
  notifications,
  onReadAllNotifications,
  onOpenNotification
}) {
  const [keyword, setKeyword] = useState("");
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const unreadCount = notifications.filter((item) => !item.read).length;
  const noticeRef = useRef(null);
  const regionRef = useRef(null);

  useGSAP(
    () => {
      if (noticeOpen && noticeRef.current) {
        gsap.fromTo(
          noticeRef.current,
          { autoAlpha: 0, y: -12, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" }
        );
      }
    },
    { dependencies: [noticeOpen] }
  );

  useGSAP(
    () => {
      if (regionOpen && regionRef.current) {
        gsap.fromTo(
          regionRef.current,
          { autoAlpha: 0, y: -12, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" }
        );
      }
    },
    { dependencies: [regionOpen] }
  );

  function submitSearch(event) {
    event.preventDefault();
    onSearch(keyword);
  }

  function chooseRegion(nextRegion) {
    onRegionChange(nextRegion);
    setRegionOpen(false);
  }

  return (
    <header className="sticky top-0 z-20 mb-5 border-b border-white/80 bg-campus-bg/95 px-5 py-3 backdrop-blur sm:px-6 md:px-8 xl:ml-64">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[max-content_minmax(320px,1fr)_auto] xl:grid-cols-[max-content_minmax(420px,1fr)_auto] xl:gap-5">
          <div className="min-w-0 lg:pr-2">
            <h1 className="truncate text-2xl font-black leading-tight text-campus-ink sm:text-3xl">{title}</h1>
          </div>

          <form onSubmit={submitSearch} className="order-3 col-span-2 flex min-h-12 w-full items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-2 shadow-soft transition focus-within:border-campus-orange lg:order-none lg:col-span-1 lg:min-w-0">
            <Search size={20} className="shrink-0 text-slate-400" />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索物品、求助、活动、资料..."
              className="h-9 min-w-0 flex-1 bg-transparent text-sm font-bold text-campus-ink outline-none placeholder:text-campus-muted"
            />
            <button type="submit" className="shrink-0 rounded-xl bg-campus-orangeSoft px-3 py-2 text-xs font-bold text-campus-orange transition hover:bg-orange-100">
              搜索
            </button>
          </form>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() => setRegionOpen((open) => !open)}
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-2 text-xs font-bold text-campus-ink shadow-soft transition hover:border-campus-orange hover:text-campus-orange sm:min-h-12 sm:px-4"
              >
                <MapPin size={16} className="text-campus-orange" />
                <span className="hidden xs:inline sm:inline">{region}</span>
                <ChevronDown size={14} className={`transition ${regionOpen ? "rotate-180" : ""}`} />
              </button>
              {regionOpen ? (
                <div ref={regionRef} className="absolute left-0 top-14 z-50 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl sm:left-auto sm:right-0">
                  {regions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => chooseRegion(item)}
                      className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                        item === region ? "bg-campus-orangeSoft text-campus-orange" : "text-campus-muted hover:bg-slate-50 hover:text-campus-ink"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative">
              <button
                onClick={() => setNoticeOpen((open) => !open)}
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-campus-muted shadow-soft transition hover:text-campus-orange sm:h-12 sm:w-12"
                aria-label="通知"
              >
                <Bell size={19} />
                {unreadCount ? (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">{unreadCount}</span>
                ) : null}
              </button>
              {noticeOpen ? (
                <div ref={noticeRef} className="absolute right-0 top-14 z-50 w-86 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl sm:top-16">
                  <div className="mb-2 flex items-center justify-between px-2 py-1">
                    <div>
                      <p className="text-sm font-black text-campus-ink">通知中心</p>
                      <p className="text-xs text-campus-muted">{unreadCount ? `${unreadCount} 条未读消息` : "暂无未读消息"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={onReadAllNotifications}
                      className="rounded-xl bg-campus-orangeSoft px-3 py-1.5 text-xs font-bold text-campus-orange transition hover:bg-orange-100"
                    >
                      全部已读
                    </button>
                  </div>
                  <div className="max-h-96 space-y-2 overflow-auto">
                    {notifications.map((notice) => (
                      <button
                        key={notice.id}
                        type="button"
                        onClick={() => {
                          setNoticeOpen(false);
                          onOpenNotification(notice);
                        }}
                        className="block w-full rounded-2xl bg-slate-50 p-3 text-left transition hover:bg-campus-orangeSoft"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-1 h-2 w-2 rounded-full ${notice.read ? "bg-slate-300" : "bg-red-500"}`} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-black text-campus-ink">{notice.title}</p>
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-campus-muted">{notice.desc}</p>
                            <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-campus-muted">
                              <Clock3 size={13} />
                              {notice.time}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => onNavigate("profile")}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white p-1.5 shadow-soft transition hover:scale-[1.02] sm:h-12 sm:w-12"
              aria-label="进入用户中心"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-campus-blue text-sm font-black text-white sm:h-9 sm:w-9">{mockUser.name.slice(0, 1)}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
