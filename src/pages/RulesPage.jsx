import { AlertTriangle, BadgeCheck, BellRing, EyeOff, FileClock, HeartPulse, ShieldCheck, UserCheck, Users } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsapSetup";
import { setupScrollReveal } from "../animations/scrollAnimations";
import Card from "../components/common/Card";

const rules = [
  { icon: UserCheck, title: "实名认证", text: "老人、家属、志愿者均需实名登记，社区工作人员审核后才能发布、申请和报名。" },
  { icon: EyeOff, title: "联系方式脱敏", text: "默认隐藏手机号、身份证等联系方式，申请后才显示脱敏信息，保护老人隐私。" },
  { icon: FileClock, title: "上门服务留痕", text: "上门关怀、维修、陪诊等服务全程记录，便于追溯和家属查看。" },
  { icon: BadgeCheck, title: "志愿者信用积分", text: "按时完成服务、获得好评会提升信用积分，违约或投诉会扣分。" },
  { icon: AlertTriangle, title: "异常行为举报", text: "支持对失约、虚假信息、可疑推销、危险行为进行举报，社区会跟进处理。" },
  { icon: ShieldCheck, title: "老人隐私保护", text: "老人住址、健康状况、联系方式等敏感信息加密存储，仅授权人员可查看。" },
  { icon: Users, title: "家属可查看授权记录", text: "老人可授权家属查看自己的求助与服务记录，家属能及时了解老人状况。" },
  { icon: BellRing, title: "贵重物品不建议私下交易", text: "贵重物品建议通过社区服务站登记流转，避免私下交易产生纠纷。" },
  { icon: HeartPulse, title: "身体不适联系家属或专业机构", text: "涉及身体不适时建议第一时间联系家属或拨打 120，平台仅提供社区协助。" }
];

export default function RulesPage() {
  const scope = useRef(null);

  useGSAP(() => setupScrollReveal(".rule-card", scope.current), { scope });

  return (
    <div ref={scope} className="space-y-5">
      <Card>
        <h2 className="text-2xl font-black text-campus-ink">社区安全规则</h2>
        <p className="mt-2 text-sm leading-6 text-campus-muted">平台围绕实名认证、隐私脱敏、上门留痕、信用积分和家属授权设计，守护每一位老人的安全与尊严。</p>
      </Card>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <Card key={rule.title} className="rule-card group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-campus-orangeSoft text-campus-orange transition group-hover:scale-105">
                <Icon size={23} />
              </div>
              <h3 className="text-lg font-black text-campus-ink">{rule.title}</h3>
              <p className="mt-2 text-sm leading-6 text-campus-muted">{rule.text}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
