import { percent } from "../../utils/score";
import ProgressBar from "../common/ProgressBar";

export default function VolunteerProgress({ current, target }) {
  const value = percent(current, target);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-bold text-campus-muted">
        <span>报名进度</span>
        <span>{current}/{target} · {value}%</span>
      </div>
      <ProgressBar value={value} />
    </div>
  );
}
