type InterestChipProps = {
  label: string;
  icon: string;
};

export default function InterestChip({
  label,
  icon,
}: InterestChipProps) {
  return (
    <button
      type="button"
      className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-lg"
    >
      <span className="text-xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
}