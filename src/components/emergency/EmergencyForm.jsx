import { useState } from "react";
import { emergencyTypes, urgencyLevels } from "../../constants/categories";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const initial = { title: "", content: "", type: "手机操作求助", urgency: "普通", place: "" };

export default function EmergencyForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!form.title || !form.content || !form.place) return onSubmit(null, "请填写标题、内容和楼栋");
    onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="求助标题" value={form.title} onChange={(e) => update("title", e.target.value)} />
      <Input label="求助内容" value={form.content} onChange={(e) => update("content", e.target.value)} />
      <div className="grid gap-4 md:grid-cols-3">
        <Select label="类型" value={form.type} onChange={(e) => update("type", e.target.value)} options={emergencyTypes} />
        <Select label="紧急程度" value={form.urgency} onChange={(e) => update("urgency", e.target.value)} options={urgencyLevels} />
        <Input label="楼栋" value={form.place} onChange={(e) => update("place", e.target.value)} />
      </div>
      <p className="rounded-2xl bg-red-50 p-3 text-xs leading-5 text-red-600">紧急提示：如遇突发疾病、严重摔倒、意识不清等情况，请立即拨打 120 急救电话并联系家属，本平台仅提供社区协助。</p>
      <Button className="w-full" type="submit">发布临时求助</Button>
    </form>
  );
}
