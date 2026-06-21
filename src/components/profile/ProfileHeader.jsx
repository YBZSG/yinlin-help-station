import { maskPhone, maskIdCard } from "../../utils/mask";
import Card from "../common/Card";
import Badge from "../common/Badge";

export default function ProfileHeader({ user }) {
  return (
    <Card className="gsap-reveal">
      <div className="flex flex-wrap items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-campus-orange text-3xl font-black text-white">{user.name.slice(0, 1)}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-black text-campus-ink">{user.name}</h2>
            <Badge tone="orange">{user.role}</Badge>
            <Badge tone="green">实名认证</Badge>
          </div>
          <p className="mt-2 text-sm text-campus-muted">所属 {user.building} · 身份证 {maskIdCard(user.idCard)} · 手机 {maskPhone(user.phone)}</p>
        </div>
      </div>
    </Card>
  );
}
