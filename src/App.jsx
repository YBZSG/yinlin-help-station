import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { animatePageEnter } from "./animations/pageTransitions";
import { createId, storageKeys } from "./utils/storage";
import { nowText } from "./utils/time";
import { filterByRegion, normalizeRegion } from "./utils/region";
import { routes } from "./constants/routes";
import { mockItems } from "./data/mockItems";
import { mockMaterials } from "./data/mockMaterials";
import { mockHelpRequests } from "./data/mockHelpRequests";
import { mockEmergency } from "./data/mockEmergency";
import { mockVolunteer } from "./data/mockVolunteer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import MainLayout from "./layout/MainLayout";
import Modal from "./components/common/Modal";
import Badge from "./components/common/Badge";
import Button from "./components/common/Button";
import Dashboard from "./pages/Dashboard";
import ItemsPage from "./pages/ItemsPage";
import MaterialsPage from "./pages/MaterialsPage";
import HelpPage from "./pages/HelpPage";
import EmergencyPage from "./pages/EmergencyPage";
import VolunteerPage from "./pages/VolunteerPage";
import ProfilePage from "./pages/ProfilePage";
import RulesPage from "./pages/RulesPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const DataScreenPage = lazy(() => import("./pages/DataScreenPage"));

const seedNotifications = [
  { id: "notice_1", title: "健康资料申请已记录", desc: "高血压日常管理小贴士可在健康资料页查看。", time: "刚刚", route: "materials", read: false },
  { id: "notice_2", title: "有新的临时求助", desc: "3 号楼有老人需要陪同前往社区卫生服务中心。", time: "12 分钟前", route: "emergency", read: false },
  { id: "notice_3", title: "志愿活动报名提醒", desc: "周末陪伴聊天活动本周六开始签到。", time: "30 分钟前", route: "volunteer", read: false }
];

function DetailModal({ detail, onClose }) {
  if (!detail) return null;
  const rows = Object.entries(detail.fields || {}).filter(([, value]) => value !== undefined && value !== "");
  return (
    <Modal open={Boolean(detail)} title={detail.title} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="green">{detail.module}</Badge>
          {detail.status ? <Badge tone="blue">{detail.status}</Badge> : null}
        </div>
        {detail.description ? <p className="text-sm leading-7 text-campus-muted">{detail.description}</p> : null}
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold text-campus-muted">{label}</p>
              <p className="mt-1 text-sm font-black text-campus-ink">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>关闭</Button>
        </div>
      </div>
    </Modal>
  );
}

export default function App() {
  const [current, setCurrent] = useState("dashboard");
  const [toast, setToast] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [detail, setDetail] = useState(null);
  const [items, setItems] = useLocalStorage(storageKeys.items, mockItems);
  const [materials, setMaterials] = useLocalStorage(storageKeys.materials, mockMaterials);
  const [help, setHelp] = useLocalStorage(storageKeys.help, mockHelpRequests);
  const [emergency, setEmergency] = useLocalStorage(storageKeys.emergency, mockEmergency);
  const [volunteer, setVolunteer] = useLocalStorage(storageKeys.volunteer, mockVolunteer);
  const [favorites, setFavorites] = useLocalStorage(storageKeys.favorites, []);
  const [applications, setApplications] = useLocalStorage(storageKeys.applications, []);
  const [feedback, setFeedback] = useLocalStorage(storageKeys.feedback, []);
  const [notifications, setNotifications] = useLocalStorage(storageKeys.notifications, seedNotifications);
  const [region, setRegion] = useLocalStorage(storageKeys.region, "全部社区");
  const [revealedContacts, setRevealedContacts] = useState([]);
  const pageRef = useRef(null);
  const normalizedRegion = normalizeRegion(region);

  useEffect(() => {
    if (region !== normalizedRegion) setRegion(normalizedRegion);
  }, [region, normalizedRegion, setRegion]);

  const title = current === "search" ? "搜索结果" : routes.find((route) => route.key === current)?.label || "首页";
  const filteredState = {
    items: filterByRegion(items, normalizedRegion),
    materials,
    help: filterByRegion(help, normalizedRegion),
    emergency: filterByRegion(emergency, normalizedRegion),
    volunteer
  };

  useGSAP(
    () => {
      if (pageRef.current) animatePageEnter(pageRef.current);
    },
    { scope: pageRef, dependencies: [current], revertOnUpdate: true }
  );

  function notify(message) {
    setToast(message);
  }

  function pushNotification(titleText, desc, route) {
    setNotifications((prev) => [
      { id: createId("notice"), title: titleText, desc, route, time: nowText(), read: false },
      ...prev
    ].slice(0, 12));
  }

  function handleGlobalSearch(keyword) {
    const text = keyword.trim();
    if (!text) {
      notify("请输入要搜索的关键词");
      return;
    }
    setSearchKeyword(text);
    setCurrent("search");
    notify("已生成搜索结果");
  }

  function addApplication(type, titleText) {
    setApplications((prev) => [...prev, { id: createId("app"), type, title: titleText, time: nowText() }]);
  }

  function openDetail(module, item) {
    const maps = {
      item: {
        module: "适老物品",
        title: item.name,
        status: item.status,
        description: item.description,
        fields: { 分类: item.category, 方式: item.type, 所在楼栋: item.area, 新旧程度: item.condition, 联系人: item.owner, 信用分要求: `${item.creditRequired}+` }
      },
      material: {
        module: "健康资料",
        title: item.title,
        description: item.description,
        fields: { 资料分类: item.category, 资料类型: item.type, 上传者: item.uploader, 申请次数: `${item.count} 次` }
      },
      help: {
        module: "生活互助",
        title: item.title,
        status: item.status,
        fields: { 需要帮忙: item.material, 地点: item.place, 期望时间: item.expectedTime, 发布者: item.publisher }
      },
      emergency: {
        module: "临时求助",
        title: item.title,
        status: item.status,
        description: item.content,
        fields: { 类型: item.type, 紧急程度: item.urgency, 地点: item.place, 发布时间: item.createdAt }
      },
      volunteer: {
        module: "志愿招募",
        title: item.name,
        description: item.description,
        fields: { 活动时间: item.time, 活动地点: item.place, 当前报名: `${item.current}/${item.target}`, 志愿时长: `${item.hours} 小时` }
      }
    };
    setDetail(maps[module]);
  }

  function handleAddItem(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setItems((prev) => [{ ...data, id: createId("item"), status: "可申请", image: "/mock-images/lamp.svg" }, ...prev]);
    notify("适老物品发布成功");
    pushNotification("新的适老物品", `${data.name} 已发布，可在适老物品共享中查看。`, "items");
    return true;
  }

  function handleReveal(id) {
    setRevealedContacts((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const item = items.find((entry) => entry.id === id);
    if (item) {
      addApplication("申请联系", item.name);
      pushNotification("联系方式已解锁", `${item.name} 的脱敏联系方式已显示。`, "items");
    }
    notify("已显示脱敏联系方式");
  }

  function handleAddMaterial(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setMaterials((prev) => [{ ...data, id: createId("mat"), count: 0 }, ...prev]);
    notify("健康资料发布成功");
    pushNotification("新的健康资料", `${data.title} 已发布到健康资料共享。`, "materials");
    return true;
  }

  function handleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    notify(favorites.includes(id) ? "已取消收藏" : "收藏成功");
  }

  function handleMaterialApply(material) {
    setMaterials((prev) => prev.map((item) => (item.id === material.id ? { ...item, count: item.count + 1 } : item)));
    addApplication("资料申请", material.title);
    pushNotification("资料申请已记录", `${material.title} 已加入你的申请记录。`, "profile");
    notify("资料申请已记录");
  }

  function handleAddHelp(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setHelp((prev) => [{ ...data, id: createId("help"), status: "待响应" }, ...prev]);
    notify("生活互助求助发布成功");
    pushNotification("新的生活互助", `${data.title} 正在等待邻里响应。`, "help");
    return true;
  }

  function updateHelpStatus(id, status, message) {
    setHelp((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    const target = help.find((item) => item.id === id);
    if (target) {
      addApplication(status === "已响应" ? "我来帮忙" : "完成互助", target.title);
      pushNotification(status === "已响应" ? "互助已响应" : "互助已完成", `${target.title} 状态更新为${status}。`, "help");
    }
    notify(message);
  }

  function handleAddEmergency(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setEmergency((prev) => [{ ...data, id: createId("em"), createdAt: nowText(), status: "待响应" }, ...prev]);
    notify("临时求助发布成功");
    pushNotification("新的临时求助", `${data.title} 已发布，请及时关注。`, "emergency");
    return true;
  }

  function handleJoinVolunteer(id) {
    const target = volunteer.find((item) => item.id === id);
    if (!applications.some((item) => item.type === "志愿报名" && item.title === target?.name)) {
      setVolunteer((prev) => prev.map((item) => (item.id === id ? { ...item, current: Math.min(item.current + 1, item.target) } : item)));
      addApplication("志愿报名", target?.name || id);
      pushNotification("志愿报名成功", `${target?.name || "志愿活动"} 已加入我的服务。`, "profile");
    }
    notify("报名成功，已加入我的服务");
  }

  function handleAddVolunteer(data, error) {
    if (!data) {
      notify(error);
      return false;
    }
    setVolunteer((prev) => [{ ...data, id: createId("vol"), current: 0 }, ...prev]);
    notify("志愿活动发布成功");
    pushNotification("新的志愿活动", `${data.name} 已发布，可前往志愿招募查看。`, "volunteer");
    return true;
  }

  function handleAddFeedback(data) {
    if (!data.title.trim() || !data.content.trim()) {
      notify("请填写反馈标题和内容");
      return false;
    }
    setFeedback((prev) => [...prev, { ...data, id: createId("feedback"), time: nowText(), status: "已收到" }]);
    notify("反馈已提交");
    pushNotification("反馈已收到", `${data.title} 已进入处理记录。`, "profile");
    return true;
  }

  function handleOpenNotification(notice) {
    setNotifications((prev) => prev.map((item) => (item.id === notice.id ? { ...item, read: true } : item)));
    setCurrent(notice.route);
  }

  const pages = {
    dashboard: <Dashboard state={filteredState} region={normalizedRegion} onNavigate={setCurrent} />,
    datav: <DataScreenPage state={filteredState} region={normalizedRegion} />,
    items: <ItemsPage items={filteredState.items} revealedContacts={revealedContacts} onReveal={handleReveal} onAddItem={handleAddItem} onOpenDetail={(item) => openDetail("item", item)} />,
    materials: <MaterialsPage materials={filteredState.materials} favorites={favorites} onFavorite={handleFavorite} onApply={handleMaterialApply} onAddMaterial={handleAddMaterial} onOpenDetail={(item) => openDetail("material", item)} />,
    help: <HelpPage help={filteredState.help} onAddHelp={handleAddHelp} onRespondHelp={(id) => updateHelpStatus(id, "已响应", "已响应该求助")} onCompleteHelp={(id) => updateHelpStatus(id, "已完成", "互助已完成")} onOpenDetail={(item) => openDetail("help", item)} />,
    emergency: <EmergencyPage emergency={filteredState.emergency} onAddEmergency={handleAddEmergency} onOpenDetail={(item) => openDetail("emergency", item)} />,
    volunteer: <VolunteerPage volunteer={filteredState.volunteer} joined={applications.filter((item) => item.type === "志愿报名").map((item) => volunteer.find((v) => v.name === item.title)?.id || item.title)} onJoin={handleJoinVolunteer} onAddVolunteer={handleAddVolunteer} onOpenDetail={(item) => openDetail("volunteer", item)} />,
    profile: <ProfilePage items={items} help={help} favorites={favorites} applications={applications} feedback={feedback} onAddFeedback={handleAddFeedback} />,
    rules: <RulesPage />,
    search: <SearchResultsPage keyword={searchKeyword} state={filteredState} onNavigate={setCurrent} />
  };

  return (
    <MainLayout
      current={current}
      title={title}
      onNavigate={setCurrent}
      onSearch={handleGlobalSearch}
      region={normalizedRegion}
      onRegionChange={setRegion}
      notifications={notifications}
      onReadAllNotifications={() => setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))}
      onOpenNotification={handleOpenNotification}
      toast={toast}
      clearToast={() => setToast("")}
    >
      <div ref={pageRef} className="page-motion">
        <Suspense fallback={<div className="page-shell"><section className="rounded-2xl bg-white p-6 text-sm font-bold text-campus-muted shadow-soft">数据大屏加载中...</section></div>}>
          {pages[current]}
        </Suspense>
      </div>
      <DetailModal detail={detail} onClose={() => setDetail(null)} />
    </MainLayout>
  );
}
