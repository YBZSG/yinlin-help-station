import Badge from "../common/Badge";

const tone = { 普通: "green", 较急: "orange", 紧急: "red" };

export default function UrgencyBadge({ level }) {
  return <Badge tone={tone[level]}>{level}</Badge>;
}
