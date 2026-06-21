export function maskPhone(phone = "") {
  return phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
}

// 身份证号脱敏：保留前 3 位和后 2 位
export function maskIdCard(id = "") {
  if (id.length < 8) return id;
  return `${id.slice(0, 3)}********${id.slice(-2)}`;
};

// 兼容旧引用（学号脱敏 → 身份证脱敏）
export const maskStudentId = maskIdCard;

export function maskContact(contact = "") {
  if (/^\d{11}$/.test(contact)) return maskPhone(contact);
  if (contact.includes("@")) {
    const [name, domain] = contact.split("@");
    return `${name.slice(0, 2)}***@${domain}`;
  }
  return `${contact.slice(0, 2)}***`;
}
