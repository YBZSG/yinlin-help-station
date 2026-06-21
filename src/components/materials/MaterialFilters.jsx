import { materialCategories } from "../../constants/categories";
import SearchBar from "../common/SearchBar";
import Select from "../common/Select";

export default function MaterialFilters({ query, setQuery, category, setCategory }) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_220px]">
      <SearchBar value={query} onChange={setQuery} placeholder="搜索资料标题、分类、上传者" />
      <Select value={category} onChange={(e) => setCategory(e.target.value)} options={materialCategories} />
    </div>
  );
}
