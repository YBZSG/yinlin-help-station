// 社区成员（老人 + 家属 + 志愿者 + 工作人员）数量
const memberCounts = {
  全部社区: 1286,
  南苑: 672,
  北苑: 614
};

// 重点关怀老人数量
const elderCareCounts = {
  全部社区: 86,
  南苑: 48,
  北苑: 38
};

function splitValue(total, region, southRatio = 0.52) {
  if (region === "南苑") return Math.round(total * southRatio);
  if (region === "北苑") return total - Math.round(total * southRatio);
  return total;
}

export function getCampusMetrics(state, region = "全部社区") {
  const helpOpenCount = state.help.filter((item) => item.status !== "已完成" && item.status !== "已取消").length;
  const helpRespondedCount = state.help.filter((item) => item.status === "已响应" || item.status === "进行中" || item.status === "已完成").length;
  const emergencyOpenCount = state.emergency.filter((item) => item.status !== "已完成").length;
  const totalVolunteerHours = state.volunteer.reduce((sum, item) => sum + Math.round(item.current * item.hours), 0);
  const volunteerActivityCount = splitValue(state.volunteer.length, region, 0.54);

  const itemCount = state.items.length;
  const materialCount = splitValue(state.materials.length, region, 0.56);
  const helpCount = helpOpenCount + emergencyOpenCount;
  const volunteerHours = splitValue(totalVolunteerHours, region, 0.53);

  // 本月陪诊 / 代买 / 上门关怀次数（基于互助数据估算）
  const escortCount = state.help.filter((item) => ["陪同散步", "代买药品"].includes(item.material)).length + state.emergency.filter((item) => item.type === "陪同就医").length;
  const buyCount = state.help.filter((item) => ["帮忙买菜", "代买药品", "取送快递"].includes(item.material)).length;
  const homeVisitCount = state.help.filter((item) => ["上门查看", "维修帮忙", "手机指导"].includes(item.material)).length + state.volunteer.filter((item) => item.name.includes("巡访") || item.name.includes("送餐")).length;

  return {
    members: memberCounts[region] || memberCounts["全部社区"],
    elderCare: elderCareCounts[region] || elderCareCounts["全部社区"],
    itemCount,
    materialCount,
    helpCount,
    helpResponded: helpRespondedCount,
    volunteerHours,
    volunteerActivityCount,
    escortCount,
    buyCount,
    homeVisitCount,
    totalRecords: itemCount + materialCount + helpCount + volunteerActivityCount
  };
}
