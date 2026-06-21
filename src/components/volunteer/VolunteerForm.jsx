import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const initial = { name: "", time: "", place: "", target: 20, hours: 2, description: "" };

export default function VolunteerForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!form.name || !form.time || !form.place) return onSubmit(null, "请填写活动名称、时间和地点");
    onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="活动名称" value={form.name} onChange={(e) => update("name", e.target.value)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="活动时间" value={form.time} onChange={(e) => update("time", e.target.value)} />
        <Input label="活动地点" value={form.place} onChange={(e) => update("place", e.target.value)} />
        <Input label="目标人数" type="number" value={form.target} onChange={(e) => update("target", Number(e.target.value))} />
        <Input label="志愿时长" type="number" value={form.hours} onChange={(e) => update("hours", Number(e.target.value))} />
      </div>
      <Input label="活动说明" value={form.description} onChange={(e) => update("description", e.target.value)} />
      <Button className="w-full" type="submit">发布活动</Button>
    </form>
  );
}
