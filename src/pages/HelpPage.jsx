import { useState } from "react";
import { Plus } from "lucide-react";
import { useFilteredList } from "../hooks/useFilteredList";
import { useGsapReveal } from "../hooks/useGsapReveal";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import HelpCard from "../components/help/HelpCard";
import HelpFilters from "../components/help/HelpFilters";
import HelpForm from "../components/help/HelpForm";

export default function HelpPage({ help, onAddHelp, onRespondHelp, onCompleteHelp, onOpenDetail }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [status, setStatus] = useState("全部");
  const filtered = useFilteredList(help, { query, category, type: status, keys: ["title", "material", "place", "publisher"] });
  const scope = useGsapReveal([filtered.length, query, category, status]);

  return (
    <div ref={scope} className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <HelpFilters query={query} setQuery={setQuery} category={category} setCategory={setCategory} status={status} setStatus={setStatus} />
        </div>
        <Button className="w-full lg:w-auto" icon={Plus} onClick={() => setOpen(true)}>发布生活互助</Button>
      </div>
      <div className="rounded-2xl bg-campus-orangeSoft/70 p-4 text-sm leading-6 text-campus-orange">
        温馨提示：涉及药品仅限代买常规药品或按老人/家属要求购买，平台不提供医疗诊断建议；如遇身体严重不适请联系家属或拨打 120。
      </div>
      {filtered.length ? <div className="grid gap-5 lg:grid-cols-2">{filtered.map((item) => <HelpCard key={item.id} help={item} onRespond={onRespondHelp} onComplete={onCompleteHelp} onOpenDetail={onOpenDetail} />)}</div> : <EmptyState title="暂无互助需求" />}
      <Modal open={open} title="发布生活互助" onClose={() => setOpen(false)}>
        <HelpForm onSubmit={(data, error) => { if (onAddHelp(data, error)) setOpen(false); }} />
      </Modal>
    </div>
  );
}
