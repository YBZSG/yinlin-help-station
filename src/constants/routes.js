import {
  BarChart3,
  BookHeart,
  HandHeart,
  HeartHandshake,
  Home,
  PackageOpen,
  ShieldCheck,
  Siren,
  UserRound
} from "lucide-react";

export const routes = [
  { key: "dashboard", label: "首页", icon: Home },
  { key: "items", label: "适老物品", icon: PackageOpen },
  { key: "materials", label: "健康资料", icon: BookHeart },
  { key: "help", label: "生活互助", icon: HeartHandshake },
  { key: "datav", label: "关怀大屏", icon: BarChart3 },
  { key: "emergency", label: "临时求助", icon: Siren },
  { key: "volunteer", label: "志愿招募", icon: HandHeart },
  { key: "profile", label: "我的", icon: UserRound },
  { key: "rules", label: "安全规则", icon: ShieldCheck }
];

export const quickActions = [
  { key: "emergency", label: "一键求助" },
  { key: "help", label: "发布求助" },
  { key: "items", label: "借用物品" },
  { key: "volunteer", label: "报名志愿" }
];
