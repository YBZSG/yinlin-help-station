const tones = {
  green: "bg-campus-greenSoft text-campus-green",
  blue: "bg-campus-blueSoft text-campus-blue",
  orange: "bg-campus-orangeSoft text-amber-700",
  red: "bg-red-50 text-red-600",
  gray: "bg-slate-100 text-slate-600"
};

export default function Badge({ children, tone = "green", className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone] || tones.green} ${className}`}>
      {children}
    </span>
  );
}
