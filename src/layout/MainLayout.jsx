import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";
import Toast from "../components/common/Toast";

export default function MainLayout({
  current,
  title,
  onNavigate,
  onSearch,
  region,
  onRegionChange,
  notifications,
  onReadAllNotifications,
  onOpenNotification,
  toast,
  clearToast,
  children
}) {
  return (
    <div className="min-h-screen overflow-x-hidden pb-24 xl:pb-0">
      <Sidebar current={current} onNavigate={onNavigate} />
      <Topbar
        title={title}
        onNavigate={onNavigate}
        onSearch={onSearch}
        region={region}
        onRegionChange={onRegionChange}
        notifications={notifications}
        onReadAllNotifications={onReadAllNotifications}
        onOpenNotification={onOpenNotification}
      />
      <main className="px-4 sm:px-6 md:px-8 xl:ml-64">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
      <MobileNav current={current} onNavigate={onNavigate} />
      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}
