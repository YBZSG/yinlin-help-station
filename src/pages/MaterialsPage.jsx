import { useState } from "react";
import { Plus } from "lucide-react";
import { useFilteredList } from "../hooks/useFilteredList";
import { useGsapReveal } from "../hooks/useGsapReveal";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import MaterialCard from "../components/materials/MaterialCard";
import MaterialFilters from "../components/materials/MaterialFilters";
import MaterialForm from "../components/materials/MaterialForm";

export default function MaterialsPage({ materials, favorites, onFavorite, onApply, onAddMaterial, onOpenDetail }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const filtered = useFilteredList(materials, { query, category, keys: ["title", "description", "uploader", "category"] });
  const scope = useGsapReveal([filtered.length, query, category, favorites.length]);

  return (
    <div ref={scope} className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <MaterialFilters query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
        </div>
        <Button className="w-full lg:w-auto" icon={Plus} onClick={() => setOpen(true)}>发布健康资料</Button>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((material) => <MaterialCard key={material.id} material={material} favorite={favorites.includes(material.id)} onFavorite={onFavorite} onApply={onApply} onOpenDetail={onOpenDetail} />)}</div>
      ) : <EmptyState title="没有找到匹配资料" />}
      <Modal open={open} title="发布健康资料" onClose={() => setOpen(false)}>
        <MaterialForm onSubmit={(data, error) => { if (onAddMaterial(data, error)) setOpen(false); }} />
      </Modal>
    </div>
  );
}
