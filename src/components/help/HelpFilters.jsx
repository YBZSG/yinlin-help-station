import { helpCategories } from "../../constants/categories";
import { helpStatus } from "../../constants/status";
import SearchBar from "../common/SearchBar";
import Select from "../common/Select";

export default function HelpFilters({ query, setQuery, category, setCategory, status, setStatus }) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_180px_160px]">
      <SearchBar value={query} onChange={setQuery} placeholder="搜索求助标题、类型、楼栋" />
      <Select value={category} onChange={(e) => setCategory(e.target.value)} options={helpCategories} />
      <Select value={status} onChange={(e) => setStatus(e.target.value)} options={["全部", ...helpStatus]} />
    </div>
  );
}
