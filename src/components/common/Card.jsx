export default function Card({ children, className = "", as: Tag = "section", ...props }) {
  return (
    <Tag className={`motion-card rounded-2xl border border-white/80 bg-white p-5 shadow-soft ${className}`} {...props}>
      {children}
    </Tag>
  );
}
