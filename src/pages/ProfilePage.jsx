import { useState } from "react";
import { BookMarked, HandHeart, Heart, MessageSquareText, Send, ThumbsUp, Trophy } from "lucide-react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { mockUser } from "../data/mockUser";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import CreditPanel from "../components/profile/CreditPanel";
import MyApplications from "../components/profile/MyApplications";
import MyPosts from "../components/profile/MyPosts";
import ProfileHeader from "../components/profile/ProfileHeader";

const feedbackTypes = ["功能建议", "体验问题", "安全隐患", "信息纠错", "其他反馈"];
const initialFeedback = { type: "功能建议", title: "", content: "", contact: "" };

function MiniStat({ label, value, icon: Icon }) {
  return (
    <Card className="gsap-reveal">
      <Icon className="mb-3 text-campus-green" size={22} />
      <p className="text-2xl font-black text-campus-ink">{value}</p>
      <p className="text-sm font-semibold text-campus-muted">{label}</p>
    </Card>
  );
}

function FeedbackPanel({ feedback, onAddFeedback }) {
  const [form, setForm] = useState(initialFeedback);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit(event) {
    event.preventDefault();
    if (onAddFeedback(form)) {
      setForm(initialFeedback);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
      <Card className="gsap-reveal">
        <div className="mb-4 flex items-center gap-2 text-campus-green">
          <MessageSquareText size={20} />
          <h3 className="text-lg font-black text-campus-ink">反馈建议</h3>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="反馈类型" value={form.type} onChange={(event) => update("type", event.target.value)} options={feedbackTypes} />
            <Input label="联系方式（选填）" value={form.contact} onChange={(event) => update("contact", event.target.value)} placeholder="手机号 / 邮箱 / 楼栋号" />
          </div>
          <Input label="反馈标题" value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="简单描述问题或建议" />
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-campus-ink">反馈内容</span>
            <textarea
              value={form.content}
              onChange={(event) => update("content", event.target.value)}
              rows={5}
              placeholder="请写清楚页面、操作步骤或你的改进想法"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-campus-ink outline-none transition placeholder:text-slate-400 focus:border-campus-green focus:ring-4 focus:ring-emerald-100"
            />
          </label>
          <Button type="submit" icon={Send} className="w-full">提交反馈</Button>
        </form>
      </Card>

      <Card className="gsap-reveal">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-black text-campus-ink">反馈记录</h3>
          <Badge tone="blue">{feedback.length} 条</Badge>
        </div>
        <div className="space-y-3">
          {feedback.length ? (
            feedback.slice(-5).reverse().map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="green">{item.type}</Badge>
                  <span className="text-xs font-semibold text-campus-muted">{item.time}</span>
                </div>
                <p className="mt-3 text-sm font-black text-campus-ink">{item.title}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-campus-muted">{item.content}</p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-campus-greenSoft p-5 text-center">
              <ThumbsUp className="mx-auto text-campus-green" size={32} />
              <p className="mt-3 text-sm font-bold text-campus-green">暂无反馈记录</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function ProfilePage({ items, help, favorites, applications, feedback, onAddFeedback }) {
  const user = { ...mockUser, favorites: favorites.length, posted: items.length + help.length };
  const scope = useGsapReveal([favorites.length, applications.length, feedback.length]);

  return (
    <div ref={scope} className="space-y-5">
      <ProfileHeader user={user} />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <CreditPanel user={user} />
        <MiniStat label="互助积分" value={user.points} icon={Trophy} />
        <MiniStat label="志愿时长" value={`${user.volunteerHours} 小时`} icon={HandHeart} />
        <MiniStat label="已发布数量" value={user.posted} icon={Send} />
        <MiniStat label="已帮助次数" value={user.helped} icon={Heart} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <MyApplications applications={applications} />
        <MyPosts items={items} help={help} />
      </div>
      <FeedbackPanel feedback={feedback} onAddFeedback={onAddFeedback} />
      <Card className="gsap-reveal">
        <div className="flex items-center gap-3">
          <BookMarked className="text-campus-blue" />
          <p className="text-sm font-semibold text-campus-muted">联系方式默认隐藏，身份证和手机号仅展示必要信息，家属经授权可查看老人的服务记录，减少不必要的隐私暴露。</p>
        </div>
      </Card>
    </div>
  );
}
