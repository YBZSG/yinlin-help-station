export default function Select({ label, options = [], className = "", ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-semibold text-campus-ink">{label}</span> : null}
      <select
        className={`h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-campus-ink outline-none transition focus:border-campus-orange focus:ring-4 focus:ring-orange-100 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
