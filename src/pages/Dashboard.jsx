import {
  BellRing,
  BookHeart,
  ClipboardList,
  Heart,
  HeartHandshake,
  HeartPulse,
  LockKeyhole,
  MapPin,
  Megaphone,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Siren,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  Stethoscope,
  Home as HomeIcon
} from "lucide-react";
import { useState } from "react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { mockRankList, mockWarmStories } from "../data/mockUser";
import HeroSection from "../components/dashboard/HeroSection";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { getCampusMetrics } from "../utils/metrics";

const activityTone = {
  求助互助: "orange",
  物品共享: "green",
  志愿服务: "blue",
  资料共享: "blue",
  互助完成: "green",
  关怀动态: "orange"
};

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-lg font-black text-campus-ink">{title}</h2>
      {action ? (
        <button type="button" onClick={onAction} className="text-xs font-bold text-campus-muted transition hover:text-campus-orange">
          {action}
        </button>
      ) : null}
    </div>
  );
}

function LatestActivity({ onNavigate }) {
  const activities = [
    { id: 1, name: "刘奶奶", title: "发布了求助：腿脚不便想请人帮忙买菜", tag: "求助互助", time: "10 分钟前" },
    { id: 2, name: "王阿姨", title: "分享了物品：折叠拐杖可借用", tag: "物品共享", time: "35 分钟前" },
    { id: 3, name: "银邻志愿队", title: "发布了活动：周末陪伴聊天", tag: "志愿服务", time: "1 小时前" },
    { id: 4, name: "社区卫生服务中心", title: "上传了资料：高血压日常管理小贴士", tag: "资料共享", time: "2 小时前" },
    { id: 5, name: "张大爷", title: "完成了求助：代买降压药已送达", tag: "互助完成", time: "3 小时前" }
  ];

  return (
    <Card className="gsap-reveal">
      <SectionHeader title="最近社区动态" action="查看全部" onAction={() => onNavigate("help")} />
      <div className="space-y-1">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-slate-50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-campus-orangeSoft text-xs font-black text-campus-orange">
              {item.name.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-campus-ink">{item.name} {item.title}</p>
              <Badge tone={activityTone[item.tag]} className="mt-1">{item.tag}</Badge>
            </div>
            <span className="text-xs font-semibold text-campus-muted">{item.time}</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white py-2.5 text-sm font-bold text-campus-muted transition hover:border-campus-orange hover:text-campus-orange">
        <RefreshCw size={16} />
        刷新动态
      </button>
    </Card>
  );
}

function HotItems({ items, onNavigate }) {
  return (
    <Card className="gsap-reveal">
      <SectionHeader title="热门适老物品" action="查看全部" onAction={() => onNavigate("items")} />
      <div className="space-y-3">
        {items.slice(0, 4).map((item, index) => (
          <div key={item.id} className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 rounded-2xl p-2 transition hover:bg-slate-50 sm:grid-cols-[88px_minmax(0,1fr)_auto]">
            <img src={item.image} alt={item.name} className="h-16 w-22 rounded-xl object-cover" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-black text-campus-ink">{item.name}</p>
                <Badge tone={index === 0 ? "green" : "orange"}>{item.condition}</Badge>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-campus-muted">
                <MapPin size={13} />
                {item.area} · {item.owner}
              </p>
              <p className="mt-1 text-xs text-campus-muted">{index + 2} 小时前</p>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-3 sm:col-span-1 sm:block sm:text-right">
              <p className="mb-2 flex items-center justify-end gap-1 text-xs font-semibold text-campus-muted">
                <Heart size={14} />
                {24 - index * 5}
              </p>
              <button type="button" onClick={() => onNavigate("items")} className="rounded-xl bg-campus-orangeSoft px-3 py-1.5 text-sm font-black text-campus-orange">
                申请
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function VolunteerRank({ onNavigate }) {
  const tags = ["志愿达人", "热心邻里", "乐于助人", "关怀之星"];
  return (
    <Card className="gsap-reveal">
      <SectionHeader title="本月志愿者榜" action="查看全部" onAction={() => onNavigate("volunteer")} />
      <div className="space-y-3">
        {mockRankList.map((user, index) => (
          <div key={user.name} className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-slate-50">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${index === 0 ? "bg-campus-orangeSoft text-amber-700" : "bg-slate-100 text-campus-muted"}`}>
              {index < 3 ? <Trophy size={17} /> : index + 1}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-campus-blueSoft text-sm font-black text-campus-blue">{user.name.slice(0, 1)}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-campus-ink">{user.name}</p>
              <p className="text-xs text-campus-muted">{user.building} · 服务 {48 - index * 8} 小时</p>
            </div>
            <div className="text-right">
              <Badge tone={index === 0 ? "red" : index === 1 ? "orange" : "blue"}>{tags[index]}</Badge>
              <p className="mt-1 text-sm font-black text-campus-ink">{user.points} 积分</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="ghost" className="mt-4 w-full" icon={HeartPulse} onClick={() => onNavigate("volunteer")}>
        成为志愿者
      </Button>
    </Card>
  );
}

function EmergencyActionModal({ action, onClose }) {
  const configs = {
    alarm: {
      title: "一键求助",
      status: "已发出求助",
      tone: "text-red-600",
      icon: Siren,
      desc: "系统已记录你的求助信息，社区值守人员会尽快电话确认并跟进。",
      detail: "求助编号：NH-2026-001 · 响应队列：紧急"
    },
    medical: {
      title: "紧急就医提醒",
      status: "请立即拨打 120",
      tone: "text-red-600",
      icon: HeartPulse,
      desc: "如遇突发疾病、严重摔倒、意识不清，请立即拨打 120 急救电话并联系家属，本平台仅提供社区协助。",
      detail: "急救电话：120 · 社区卫生服务中心：025-8899 1200"
    },
    grid: {
      title: "联系社区工作人员",
      status: "已通知社区工作人员",
      tone: "text-campus-orange",
      icon: Users,
      desc: "社区工作人员会根据你所在楼栋进行电话确认或上门协助。",
      detail: "值班工作人员：陈社工 · 联系方式：138****8901"
    }
  };

  if (!action) return null;
  const config = configs[action];
  const Icon = config.icon;

  return (
    <Modal open={Boolean(action)} title={config.title} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
          <Icon size={38} />
        </div>
        <h3 className={`mt-5 text-3xl font-black ${config.tone}`}>{config.status}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-campus-muted">{config.desc}</p>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-campus-ink">{config.detail}</div>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={onClose}>我知道了</Button>
          <Button variant="ghost" onClick={onClose}>稍后查看记录</Button>
        </div>
      </div>
    </Modal>
  );
}

function EmergencyStrip({ onEmergencyAction }) {
  const actions = [
    { label: "一键求助", icon: Siren, action: "alarm" },
    { label: "紧急就医", icon: HeartPulse, action: "medical" },
    { label: "联系社区", icon: Users, action: "grid" }
  ];

  return (
    <Card className="gsap-reveal border-red-100 bg-red-50/70">
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto]">
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-red-500 sm:h-14 sm:w-14">
            <Siren size={28} />
          </div>
          <div>
            <h2 className="text-lg font-black text-red-600 sm:text-xl">紧急情况 · 立即求助</h2>
            <p className="mt-1 text-sm leading-6 text-red-500/80">如遇突发疾病、严重摔倒、意识不清，请立即拨打 120 并联系家属。</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onEmergencyAction(action.action)}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-campus-ink shadow-sm transition hover:-translate-y-0.5 hover:text-red-500 sm:min-h-14 sm:px-5 sm:text-base"
              >
                <Icon size={22} className="text-red-500" />
                <span className="whitespace-nowrap">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function ConvenienceServices({ onNavigate }) {
  const services = [
    { label: "社区公告", icon: Megaphone, route: "rules", tone: "text-campus-orange" },
    { label: "便民电话", icon: PhoneCall, route: "help", tone: "text-campus-blue" },
    { label: "寻找物品", icon: LockKeyhole, route: "emergency", tone: "text-campus-green" },
    { label: "意见建议", icon: ClipboardList, route: "profile", tone: "text-campus-orange" }
  ];

  return (
    <Card className="gsap-reveal">
      <SectionHeader title="便民服务" />
      <div className="grid grid-cols-4 gap-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <button key={service.label} type="button" onClick={() => onNavigate(service.route)} className="rounded-2xl p-3 text-center transition hover:bg-slate-50">
              <Icon className={`mx-auto ${service.tone}`} size={25} />
              <p className="mt-2 text-xs font-bold text-campus-muted">{service.label}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function WarmStories() {
  return (
    <Card className="gsap-reveal">
      <SectionHeader title="温暖互助故事" />
      <div className="space-y-3">
        {mockWarmStories.map((story) => (
          <div key={story.id} className="rounded-2xl bg-campus-orangeSoft/60 p-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-campus-orange" />
              <p className="text-sm font-black text-campus-ink">{story.title}</p>
              <span className="ml-auto text-xs font-semibold text-campus-muted">{story.time}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-campus-muted">{story.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AntiFraudCard() {
  const tips = [
    "不轻信陌生来电要转账",
    "不点击不明中奖链接",
    "不向陌生人透露验证码",
    "遇亲友借钱先电话核实"
  ];
  return (
    <Card className="gsap-reveal border-amber-100 bg-amber-50/60">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <ShieldAlert size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-black text-campus-ink">防诈骗温馨提示</h3>
          <p className="mt-1 text-sm text-campus-muted">老人朋友请警惕：冒充亲友借钱、虚假中奖、保健品推销、冒充公检法等常见诈骗。</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {tips.map((tip) => (
              <div key={tip} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-amber-700">
                <ShieldCheck size={14} className="shrink-0 text-amber-500" />
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard({ state, region, onNavigate }) {
  const [emergencyAction, setEmergencyAction] = useState(null);
  const scope = useGsapReveal([state.items.length, state.materials.length, state.help.length, state.volunteer.length]);
  const metrics = getCampusMetrics(state, region);

  return (
    <div ref={scope} className="page-shell space-y-5">
      <EmergencyStrip onEmergencyAction={setEmergencyAction} />

      <HeroSection onNavigate={onNavigate} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="今日互助请求" value={metrics.helpCount} icon={HeartHandshake} onClick={() => onNavigate("help")} />
        <StatCard label="已响应求助" value={metrics.helpResponded} icon={ShieldCheck} tone="blue" onClick={() => onNavigate("help")} />
        <StatCard label="活跃志愿者" value={metrics.volunteerActivityCount} icon={Users} tone="orange" onClick={() => onNavigate("volunteer")} />
        <StatCard label="本月志愿时长" value={metrics.volunteerHours} icon={Heart} tone="orange" onClick={() => onNavigate("volunteer")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="本月陪诊/陪同就医" value={metrics.escortCount} icon={Stethoscope} onClick={() => onNavigate("help")} />
        <StatCard label="本月代买/取送" value={metrics.buyCount} icon={Utensils} tone="blue" onClick={() => onNavigate("help")} />
        <StatCard label="本月上门关怀" value={metrics.homeVisitCount} icon={HomeIcon} tone="orange" onClick={() => onNavigate("volunteer")} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-[1.1fr_1fr_.9fr]">
        <LatestActivity onNavigate={onNavigate} />
        <HotItems items={state.items} onNavigate={onNavigate} />
        <div className="space-y-5 xl:col-span-2 2xl:col-span-1">
          <VolunteerRank onNavigate={onNavigate} />
          <ConvenienceServices onNavigate={onNavigate} />
        </div>
      </div>

      <WarmStories />

      <AntiFraudCard />

      <Card className="gsap-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="green">安全可信提示</Badge>
            <h2 className="mt-3 text-xl font-black text-campus-ink">实名认证、联系方式脱敏、上门服务留痕</h2>
            <p className="mt-2 text-sm leading-6 text-campus-muted">平台默认隐藏联系方式，申请后才显示脱敏信息；所有互助记录进入个人中心，家属经授权可查看老人服务记录，便于追踪进度与确认结果。</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-campus-greenSoft p-3 text-campus-green">
              <ShieldCheck className="mx-auto mb-1" size={22} />
              <p className="text-xs font-bold">实名认证</p>
            </div>
            <div className="rounded-2xl bg-campus-blueSoft p-3 text-campus-blue">
              <BookHeart className="mx-auto mb-1" size={22} />
              <p className="text-xs font-bold">记录可查</p>
            </div>
            <div className="rounded-2xl bg-campus-orangeSoft p-3 text-amber-700">
              <BellRing className="mx-auto mb-1" size={22} />
              <p className="text-xs font-bold">及时提醒</p>
            </div>
          </div>
        </div>
      </Card>
      <EmergencyActionModal action={emergencyAction} onClose={() => setEmergencyAction(null)} />
    </div>
  );
}
