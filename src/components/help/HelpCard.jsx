import { CheckCircle2, HandHeart } from "lucide-react";
import { maskContact } from "../../utils/mask";
import { statusTone } from "../../constants/status";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

export default function HelpCard({ help, onRespond, onComplete, onOpenDetail }) {
  return (
    <Card className="gsap-reveal">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge tone={statusTone[help.status]}>{help.status}</Badge>
          <h3 className="mt-3 text-lg font-black text-campus-ink">{help.title}</h3>
          <p className="mt-2 text-sm text-campus-muted">{help.material} · {help.place} · {help.expectedTime}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => onOpenDetail(help)}>详情</Button>
          {help.status === "待响应" ? <Button icon={HandHeart} onClick={() => onRespond(help.id)}>我来帮忙</Button> : null}
          {help.status === "已响应" ? <Button variant="secondary" icon={CheckCircle2} onClick={() => onComplete(help.id)}>完成互助</Button> : null}
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-campus-ink">{help.publisher} · {maskContact(help.contact)}</p>
    </Card>
  );
}
