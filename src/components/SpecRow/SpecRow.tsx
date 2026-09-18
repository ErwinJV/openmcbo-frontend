// components/SpecRow.tsx
interface SpecRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function SpecRow({ icon, label, value }: SpecRowProps) {
  return (
    <div className="py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-bold text-heading uppercase tracking-wide shrink-0">
        <span className="material-symbols-outlined text-brand-400 text-[18px]">
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div className="text-right text-xs sm:text-sm font-semibold text-bodytext">
        {value}
      </div>
    </div>
  );
}
