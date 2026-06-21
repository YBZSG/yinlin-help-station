import { Inbox } from "lucide-react";
import Card from "./Card";

export default function EmptyState({ title = "暂无数据", description = "换个筛选条件试试看。" }) {
  return (
    <Card className="flex min-h-48 flex-col items-center justify-center text-center">
      <Inbox className="mb-3 text-campus-orange" size={34} />
      <h3 className="text-base font-bold text-campus-ink">{title}</h3>
      <p className="mt-1 text-sm text-campus-muted">{description}</p>
    </Card>
  );
}
