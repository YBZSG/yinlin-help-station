import { Eye, Handshake } from "lucide-react";
import { maskContact } from "../../utils/mask";
import { statusTone } from "../../constants/status";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

export default function ItemCard({ item, revealed, onReveal, onOpenDetail }) {
  return (
    <Card className="gsap-reveal flex h-full flex-col">
      <div className="flex gap-4">
        <img src={item.image} alt={item.name} className="h-24 w-28 shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-campus-ink">{item.name}</h3>
            <Badge tone={statusTone[item.status]}>{item.status}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-campus-muted">{item.description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-campus-muted">
        <span>分类：{item.category}</span>
        <span>方式：{item.type}</span>
        <span>位置：{item.area}</span>
        <span>信用分：{item.creditRequired}+</span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-sm font-bold text-campus-ink">
          {item.owner} · {revealed ? maskContact(item.contact) : "联系方式已隐藏"}
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => onOpenDetail(item)}>详情</Button>
          <Button variant={revealed ? "secondary" : "primary"} icon={revealed ? Eye : Handshake} onClick={() => onReveal(item.id)}>
            {revealed ? "已显示" : "申请联系"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
