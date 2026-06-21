import { itemCategories, itemTypes } from "../../constants/categories";
import SearchBar from "../common/SearchBar";
import Select from "../common/Select";

export default function ItemFilters({ query, setQuery, category, setCategory, type, setType }) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_180px_160px]">
      <SearchBar value={query} onChange={setQuery} placeholder="搜索物品名称、描述、楼栋" />
      <Select value={category} onChange={(e) => setCategory(e.target.value)} options={itemCategories} />
      <Select value={type} onChange={(e) => setType(e.target.value)} options={itemTypes} />
    </div>
  );
}
