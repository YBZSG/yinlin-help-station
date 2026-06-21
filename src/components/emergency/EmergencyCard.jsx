import { MapPin } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import UrgencyBadge from "./UrgencyBadge";

export default function EmergencyCard({ item, onOpenDetail }) {
  const pulse = item.urgency === "紧急" ? "animate-pulse" : "";
  return (
    <Card className={`gsap-reveal ${pulse}`}>
      <div className="flex flex-wrap items-center gap-2">
        <UrgencyBadge level={item.urgency} />
        <Badge tone="blue">{item.type}</Badge>
        <Badge tone={item.status === "待响应" ? "orange" : "green"}>{item.status}</Badge>
      </div>
      <h3 className="mt-3 text-lg font-black text-campus-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-campus-muted">{item.content}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-campus-muted">
        <span className="inline-flex items-center gap-1"><MapPin size={16} />{item.place}</span>
        <span>{item.createdAt}</span>
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={() => onOpenDetail(item)}>查看详情</Button>
      </div>
    </Card>
  );
}
