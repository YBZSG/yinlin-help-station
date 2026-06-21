import Card from "../common/Card";

export default function MyPosts({ items, help }) {
  const posts = [...items.slice(0, 3).map((item) => item.name), ...help.slice(0, 2).map((item) => item.title)];
  return (
    <Card className="gsap-reveal">
      <h3 className="mb-4 text-lg font-black text-campus-ink">我的发布记录</h3>
      <div className="space-y-3">
        {posts.map((title) => (
          <div key={title} className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-campus-ink">{title}</div>
        ))}
      </div>
    </Card>
  );
}
