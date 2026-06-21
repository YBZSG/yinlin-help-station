import { useState } from "react";
import { helpCategories } from "../../constants/categories";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const initial = { title: "", material: "帮忙买菜", place: "", expectedTime: "", publisher: "", contact: "" };

export default function HelpForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!form.title || !form.place || !form.contact) return onSubmit(null, "请填写标题、楼栋和联系方式");
    onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="求助标题" value={form.title} onChange={(e) => update("title", e.target.value)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="互助类型" value={form.material} onChange={(e) => update("material", e.target.value)} options={helpCategories.filter((i) => i !== "全部")} />
        <Input label="楼栋" value={form.place} onChange={(e) => update("place", e.target.value)} />
        <Input label="期望时间" value={form.expectedTime} onChange={(e) => update("expectedTime", e.target.value)} />
        <Input label="发布者" value={form.publisher} onChange={(e) => update("publisher", e.target.value)} />
        <Input label="联系方式" value={form.contact} onChange={(e) => update("contact", e.target.value)} />
      </div>
      <p className="rounded-2xl bg-campus-orangeSoft p-3 text-xs leading-5 text-campus-orange">提示：涉及药品仅限代买常规药品或按老人/家属要求购买，平台不提供医疗诊断建议。</p>
      <Button className="w-full" type="submit">发布生活互助</Button>
    </form>
  );
}
