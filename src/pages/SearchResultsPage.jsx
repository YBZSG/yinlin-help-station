import { ArrowRight, SearchX } from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import { useGsapReveal } from "../hooks/useGsapReveal";

function includesKeyword(item, fields, keyword) {
  const normalized = keyword.trim().toLowerCase();
  if (!normalized) return false;
  return fields.some((field) => String(item[field] || "").toLowerCase().includes(normalized));
}

function buildResults(state, keyword) {
  const groups = [
    {
      module: "适老物品",
      route: "items",
      tone: "blue",
      fields: ["name", "category", "type", "area", "description", "owner"],
      data: state.items,
      title: (item) => item.name,
      meta: (item) => `${item.category} · ${item.type} · ${item.area}`,
      desc: (item) => item.description
    },
    {
      module: "健康资料",
      route: "materials",
      tone: "green",
      fields: ["title", "category", "type", "description", "uploader"],
      data: state.materials,
      title: (item) => item.title,
      meta: (item) => `${item.category} · ${item.type} · ${item.uploader}`,
      desc: (item) => item.description
    },
    {
      module: "生活互助",
      route: "help",
      tone: "orange",
      fields: ["title", "material", "place", "expectedTime", "publisher"],
      data: state.help,
      title: (item) => item.title,
      meta: (item) => `${item.material} · ${item.place} · ${item.status}`,
      desc: (item) => `期望时间：${item.expectedTime}`
    },
    {
      module: "临时求助",
      route: "emergency",
      tone: "red",
      fields: ["title", "content", "type", "urgency", "place"],
      data: state.emergency,
      title: (item) => item.title,
      meta: (item) => `${item.type} · ${item.urgency} · ${item.place}`,
      desc: (item) => item.content
    },
    {
      module: "志愿招募",
      route: "volunteer",
      tone: "green",
      fields: ["name", "time", "place", "description"],
      data: state.volunteer,
      title: (item) => item.name,
      meta: (item) => `${item.time} · ${item.place}`,
      desc: (item) => item.description
    }
  ];

  return groups.flatMap((group) =>
    group.data
      .filter((item) => includesKeyword(item, group.fields, keyword))
      .map((item) => ({
        id: `${group.route}_${item.id}`,
        module: group.module,
        route: group.route,
        tone: group.tone,
        title: group.title(item),
        meta: group.meta(item),
        desc: group.desc(item)
      }))
  );
}

export default function SearchResultsPage({ keyword, state, onNavigate }) {
  const results = buildResults(state, keyword);
  const scope = useGsapReveal([keyword, results.length]);

  return (
    <div ref={scope} className="space-y-5">
      <Card className="gsap-reveal">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-campus-green">
              <SearchX size={18} />
              <span className="text-sm font-bold">全站搜索</span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-campus-ink">“{keyword}” 的搜索结果</h2>
            <p className="mt-2 text-sm text-campus-muted">
              共找到 {results.length} 条相关服务，只展示标题、描述、地点或分类中包含关键词的内容。
            </p>
          </div>
          <Button variant="ghost" onClick={() => onNavigate("dashboard")}>返回首页</Button>
        </div>
      </Card>

      {results.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((result) => (
            <Card key={result.id} className="gsap-reveal flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <Badge tone={result.tone}>{result.module}</Badge>
                <Button variant="ghost" className="min-h-9 px-3 py-1.5" icon={ArrowRight} onClick={() => onNavigate(result.route)}>
                  进入
                </Button>
              </div>
              <h3 className="mt-4 text-lg font-black text-campus-ink">{result.title}</h3>
              <p className="mt-2 text-sm font-semibold text-campus-muted">{result.meta}</p>
              <p className="mt-3 flex-1 text-sm leading-6 text-campus-muted">{result.desc}</p>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="没有找到相关服务" description="可以换一个关键词，或返回首页查看最新互助信息。" />
      )}
    </div>
  );
}
