import { Clock3 } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";

export default function ActivityFeed({ activities }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black text-campus-ink">最近动态</h2>
        <Badge tone="blue">实时更新</Badge>
      </div>
      <div className="space-y-3">
        {activities.map((item) => (
          <div key={item.id} className="gsap-reveal flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
            <div className="mt-0.5 rounded-xl bg-white p-2 text-campus-green">
              <Clock3 size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-campus-ink">{item.title}</p>
              <p className="mt-1 text-xs text-campus-muted">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
