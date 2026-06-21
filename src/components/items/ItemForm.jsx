import { useState } from "react";
import { itemCategories, itemTypes } from "../../constants/categories";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const initial = {
  name: "",
  category: "拐杖轮椅",
  type: "免费借用",
  area: "",
  condition: "",
  description: "",
  owner: "",
  contact: "",
  creditRequired: 60
};

export default function ItemForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!form.name || !form.area || !form.contact) return onSubmit(null, "请填写物品名称、楼栋和联系方式");
    onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="物品名称" value={form.name} onChange={(e) => update("name", e.target.value)} />
        <Input label="所在楼栋 / 区域" value={form.area} onChange={(e) => update("area", e.target.value)} />
        <Select label="分类" value={form.category} onChange={(e) => update("category", e.target.value)} options={itemCategories.filter((i) => i !== "全部")} />
        <Select label="方式" value={form.type} onChange={(e) => update("type", e.target.value)} options={itemTypes.filter((i) => i !== "全部")} />
        <Input label="新旧程度" value={form.condition} onChange={(e) => update("condition", e.target.value)} />
        <Input label="信用分要求" type="number" value={form.creditRequired} onChange={(e) => update("creditRequired", Number(e.target.value))} />
        <Input label="联系人" value={form.owner} onChange={(e) => update("owner", e.target.value)} />
        <Input label="联系方式" value={form.contact} onChange={(e) => update("contact", e.target.value)} />
      </div>
      <Input label="描述" value={form.description} onChange={(e) => update("description", e.target.value)} />
      <Button className="w-full" type="submit">提交发布</Button>
    </form>
  );
}
