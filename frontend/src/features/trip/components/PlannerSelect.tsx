type PlannerSelectProps = React.ComponentProps<"select"> & {
  icon: string;
  options: string[];
};

export default function PlannerSelect({
  icon,
  options,
  className,
  ...props
}: PlannerSelectProps) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-lg focus-within:border-emerald-500">
      <span className="text-2xl">{icon}</span>

      <select
        {...props}
        className={`w-full bg-transparent text-slate-800 focus:outline-none ${className ?? ""}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}