import { CalendarDays, MapPin, UserPlus } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";
import VolunteerProgress from "./VolunteerProgress";

export default function VolunteerCard({ item, joined, onJoin, onOpenDetail }) {
  return (
    <Card className="gsap-reveal flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="green">{item.hours} 志愿时长</Badge>
          <h3 className="mt-3 text-lg font-black text-campus-ink">{item.name}</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => onOpenDetail(item)}>详情</Button>
          <Button variant={joined ? "secondary" : "primary"} icon={UserPlus} onClick={() => onJoin(item.id)}>
            {joined ? "已报名" : "报名"}
          </Button>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-campus-muted">{item.description}</p>
      <div className="mt-4 space-y-2 text-sm font-semibold text-campus-muted">
        <p className="flex items-center gap-2"><CalendarDays size={16} />{item.time}</p>
        <p className="flex items-center gap-2"><MapPin size={16} />{item.place}</p>
      </div>
      <div className="mt-5">
        <VolunteerProgress current={item.current} target={item.target} />
      </div>
    </Card>
  );
}
