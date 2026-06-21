import { useState } from "react";
import { Plus } from "lucide-react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import VolunteerCard from "../components/volunteer/VolunteerCard";
import VolunteerForm from "../components/volunteer/VolunteerForm";

export default function VolunteerPage({ volunteer, joined, onJoin, onAddVolunteer, onOpenDetail }) {
  const [open, setOpen] = useState(false);
  const scope = useGsapReveal([volunteer.length, joined.length]);

  return (
    <div ref={scope} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-campus-ink">志愿服务招募</h2>
          <p className="mt-1 text-sm text-campus-muted">报名后人数会实时增加，志愿时长会累计到个人中心。</p>
        </div>
        <Button icon={Plus} onClick={() => setOpen(true)}>发布志愿活动</Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {volunteer.map((item) => <VolunteerCard key={item.id} item={item} joined={joined.includes(item.id)} onJoin={onJoin} onOpenDetail={onOpenDetail} />)}
      </div>
      <Modal open={open} title="发布志愿活动" onClose={() => setOpen(false)}>
        <VolunteerForm onSubmit={(data, error) => { if (onAddVolunteer(data, error)) setOpen(false); }} />
      </Modal>
    </div>
  );
}
