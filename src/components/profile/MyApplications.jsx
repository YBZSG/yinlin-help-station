import Card from "../common/Card";

export default function MyApplications({ applications }) {
  return (
    <Card className="gsap-reveal">
      <h3 className="mb-4 text-lg font-black text-campus-ink">我的申请</h3>
      <div className="space-y-3">
        {applications.length ? applications.slice(-6).reverse().map((item) => (
          <div key={item.id} className="rounded-2xl bg-slate-50 p-3">
            <p className="text-sm font-bold text-campus-ink">{item.title}</p>
            <p className="mt-1 text-xs text-campus-muted">{item.type} · {item.time}</p>
          </div>
        )) : <p className="text-sm text-campus-muted">暂无申请记录。</p>}
      </div>
    </Card>
  );
}
