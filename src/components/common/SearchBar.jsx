import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "搜索关键词" }) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-base outline-none transition focus:border-campus-orange focus:ring-4 focus:ring-orange-100"
      />
    </div>
  );
}
