export default function Card({ children, className = "", as: Tag = "section", ...props }) {
  return (
    <Tag className={`motion-card rounded-2xl border border-white/80 bg-white p-4 shadow-soft sm:p-5 ${className}`} {...props}>
      {children}
    </Tag>
  );
}
