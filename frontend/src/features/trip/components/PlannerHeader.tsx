import type { InputHTMLAttributes } from "react";

type PlannerInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: string;
};

export default function PlannerInput({
  icon,
  ...props
}: PlannerInputProps) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:border-emerald-400 hover:shadow-lg focus-within:border-emerald-500">
      <span className="text-2xl">{icon}</span>

      <input
        {...props}
        className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none"
      />
    </div>
  );
}