import { Activity, BarChart3, Clock3, MapPin, RadioTower, UsersRound } from "lucide-react";
import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import CampusThreeMap from "../components/datav/CampusThreeMap";
import { getCampusMetrics } from "../utils/metrics";

const districtProfiles = {
  全部社区: [
    { name: "南苑楼栋", weight: 0.26, status: "求助较多", active: true },
    { name: "活动中心", weight: 0.18, status: "活动集中", active: true },
    { name: "社区食堂", weight: 0.24, status: "送餐关怀活跃", active: true },
    { name: "服务站", weight: 0.22, status: "响应和报名集中", active: true },
    { name: "卫生中心", weight: 0.1, status: "陪诊就医平稳", active: true }
  ],
  南苑: [
    { name: "南苑楼栋", weight: 0.36, status: "南苑老人求助较多", active: true },
    { name: "活动中心", weight: 0.16, status: "南苑活动报名", active: true },
    { name: "社区食堂", weight: 0.26, status: "靠近社区食堂", active: true },
    { name: "服务站", weight: 0.18, status: "南苑服务台响应", active: true },
    { name: "卫生中心", weight: 0.04, status: "关联较少", active: false }
  ],
  北苑: [
    { name: "南苑楼栋", weight: 0.08, status: "关联较少", active: false },
    { name: "活动中心", weight: 0.24, status: "北苑活动咨询", active: true },
    { name: "社区食堂", weight: 0.18, status: "北苑送餐关怀", active: true },
    { name: "服务站", weight: 0.16, status: "北苑服务台协调", active: true },
    { name: "卫生中心", weight: 0.34, status: "北苑陪诊就医较多", active: true }
  ]
};

function splitCount(total, profiles) {
  if (total <= 0) return profiles.map((item) => ({ ...item, count: 0, score: 0 }));
  const raw = profiles.map((item) => ({ ...item, rawCount: total * item.weight }));
  const rounded = raw.map((item) => ({ ...item, count: Math.floor(item.rawCount) }));
  let rest = total - rounded.reduce((sum, item) => sum + item.count, 0);
  rounded
    .sort((a, b) => b.rawCount - b.count - (a.rawCount - a.count))
    .forEach((item) => {
      if (rest > 0) {
        item.count += 1;
        rest -= 1;
      }
    });
  const maxCount = Math.max(...rounded.map((item) => item.count), 1);
  return profiles.map((profile) => {
    const item = rounded.find((entry) => entry.name === profile.name);
    return { ...profile, count: item.count, score: Math.max(8, Math.round((item.count / maxCount) * 100)) };
  });
}

function StatTile({ icon: Icon, label, value, note, tone = "green" }) {
  const colors = {
    green: "bg-campus-greenSoft text-campus-green",
    blue: "bg-campus-blueSoft text-campus-blue",
    orange: "bg-campus-orangeSoft text-amber-700",
    red: "bg-red-50 text-red-600"
  };

  return (
    <Card className="gsap-reveal p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${colors[tone]}`}>
          <Icon size={21} />
        </div>
        <div>
          <p className="text-xs font-bold text-campus-muted">{label}</p>
          <p className="mt-1 text-2xl font-black text-campus-ink">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-campus-muted">{note}</p>
    </Card>
  );
}

export default function DataScreenPage({ state, region }) {
  const scope = useRef(null);
  const metrics = useMemo(() => getCampusMetrics(state, region), [state, region]);

  const zoneStats = useMemo(() => {
    const base = districtProfiles[region] || districtProfiles["全部社区"];
    return splitCount(metrics.totalRecords, base);
  }, [region, metrics.totalRecords]);

  const activity = [
    { text: `${region} 有新的互助记录`, time: "刚刚" },
    { text: `${region} 志愿者已响应 3 条求助`, time: "8 分钟前" },
    { text: "健康资料收藏和求助响应已同步", time: "21 分钟前" },
    { text: "志愿报名数据已写入关怀看板", time: "35 分钟前" }
  ];

  useGSAP(
    () => {
      gsap.fromTo(".gsap-reveal", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(".signal-line", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, stagger: 0.08, duration: 0.55, ease: "power2.out" });
    },
    { scope, dependencies: [region, metrics.itemCount, metrics.materialCount, metrics.helpCount, metrics.volunteerHours], revertOnUpdate: true }
  );

  return (
    <div ref={scope} className="page-shell space-y-5">
      <section className="gsap-reveal overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-r from-campus-orange to-amber-500 p-6 text-white shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="bg-white/20 text-white">关怀大屏</Badge>
            <h2 className="mt-4 text-3xl font-black tracking-normal md:text-4xl">社区关怀数据看板</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
              把适老物品、健康资料、生活互助和志愿服务汇总到一张图里，快速看出哪个楼栋更活跃、哪类求助需要响应。
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
            <p className="text-xs font-bold text-white/75">当前片区</p>
            <p className="mt-1 text-xl font-black">{region}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={BarChart3} label="适老物品" value={metrics.itemCount} note="正在流转的适老物品" />
        <StatTile icon={Activity} label="健康资料" value={metrics.materialCount} note="可查看的健康与便民资料" tone="blue" />
        <StatTile icon={RadioTower} label="求助信号" value={metrics.helpCount} note="待响应和处理中求助" tone="orange" />
        <StatTile icon={Clock3} label="志愿时长" value={metrics.volunteerHours} note="累计服务小时" tone="red" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile icon={UsersRound} label="重点关怀老人" value={metrics.elderCare} note="社区重点关注的高龄独居老人" />
        <StatTile icon={Activity} label="已响应求助" value={metrics.helpResponded} note="已有人响应或进行中" tone="blue" />
        <StatTile icon={Clock3} label="本月陪诊代买" value={metrics.escortCount + metrics.buyCount} note="陪诊/代买/取送累计" tone="orange" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="gsap-reveal p-4">
          <CampusThreeMap intensity={Math.max(1, metrics.helpCount / 4)} zoneStats={zoneStats} region={region} />
        </Card>

        <div className="space-y-5">
          <Card className="gsap-reveal">
            <div className="flex items-center justify-between">
              <div>
              <p className="text-lg font-black text-campus-ink">各楼栋求助热度</p>
                <p className="mt-1 text-sm text-campus-muted">按当前片区记录数拆分，合计等于本页总记录</p>
              </div>
              <MapPin className="text-campus-orange" size={22} />
            </div>
            <div className="mt-5 space-y-4">
              {zoneStats.map((point) => (
                <div key={point.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-black text-campus-ink">{point.name}</span>
                    <span className="font-bold text-campus-muted">{point.count} 条 · {point.status}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="signal-line h-full rounded-full bg-campus-orange" style={{ width: `${point.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="gsap-reveal">
            <div className="flex items-center justify-between">
              <p className="text-lg font-black text-campus-ink">实时动态</p>
              <UsersRound className="text-campus-blue" size={22} />
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {activity.map((item) => (
                <div key={item.text} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="font-bold text-campus-ink">{item.text}</span>
                  <span className="shrink-0 text-xs font-semibold text-campus-muted">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
