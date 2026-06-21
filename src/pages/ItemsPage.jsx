import { useState } from "react";
import { Plus } from "lucide-react";
import { useFilteredList } from "../hooks/useFilteredList";
import { useGsapReveal } from "../hooks/useGsapReveal";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import ItemCard from "../components/items/ItemCard";
import ItemFilters from "../components/items/ItemFilters";
import ItemForm from "../components/items/ItemForm";

export default function ItemsPage({ items, revealedContacts, onReveal, onAddItem, onOpenDetail }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [type, setType] = useState("全部");
  const filtered = useFilteredList(items, { query, category, type, keys: ["name", "description", "area", "owner"] });
  const scope = useGsapReveal([filtered.length, query, category, type]);

  return (
    <div ref={scope} className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <ItemFilters query={query} setQuery={setQuery} category={category} setCategory={setCategory} type={type} setType={setType} />
        </div>
        <Button className="w-full lg:w-auto" icon={Plus} onClick={() => setOpen(true)}>发布适老物品</Button>
      </div>
      {filtered.length ? (
        <div className="grid gap-5 lg:grid-cols-2">{filtered.map((item) => <ItemCard key={item.id} item={item} revealed={revealedContacts.includes(item.id)} onReveal={onReveal} onOpenDetail={onOpenDetail} />)}</div>
      ) : <EmptyState title="没有找到匹配物品" />}
      <Modal open={open} title="发布适老物品" onClose={() => setOpen(false)}>
        <ItemForm onSubmit={(data, error) => { if (onAddItem(data, error)) setOpen(false); }} />
      </Modal>
    </div>
  );
}
