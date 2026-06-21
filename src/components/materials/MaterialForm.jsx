import { useState } from "react";
import { materialCategories, materialTypes } from "../../constants/categories";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const initial = { title: "", category: "慢病管理", type: "指南", uploader: "", description: "", fileName: "" };

export default function MaterialForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (!form.title || !form.uploader) return onSubmit(null, "请填写资料标题和上传者");
    onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <Input label="资料标题" value={form.title} onChange={(e) => update("title", e.target.value)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="资料分类" value={form.category} onChange={(e) => update("category", e.target.value)} options={materialCategories.filter((i) => i !== "全部")} />
        <Select label="资料类型" value={form.type} onChange={(e) => update("type", e.target.value)} options={materialTypes} />
        <Input label="上传者" value={form.uploader} onChange={(e) => update("uploader", e.target.value)} />
        <Input label="模拟上传文件" value={form.fileName} onChange={(e) => update("fileName", e.target.value)} placeholder="例：防诈骗指南.pdf" />
      </div>
      <Input label="描述" value={form.description} onChange={(e) => update("description", e.target.value)} />
      <Button className="w-full" type="submit">发布资料</Button>
    </form>
  );
}
