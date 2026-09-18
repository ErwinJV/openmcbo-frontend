import Image from "next/image";

interface ProviderCategoryBannerProps {
  tenantName: string;
  tenantLogo?: string | null;
  categoryName: string;
}

export default function ProviderCategoryBanner({
  tenantName,
  tenantLogo,
  categoryName,
}: ProviderCategoryBannerProps) {
  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#003593] to-[#3559B6] rounded-full pl-2 pr-5 py-2 text-white mb-2 shadow-sm">
      {tenantLogo ? (
        <Image
          src={tenantLogo}
          alt={tenantName}
          width={40}
          height={40}
          className="rounded-full object-cover bg-white w-10 h-10 shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-[#D9A300] flex items-center justify-center text-white text-lg font-bold shrink-0">
          {tenantName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] md:text-xs opacity-80 uppercase tracking-wider">
          {categoryName}
        </span>
        <h3 className="text-sm md:text-base font-bold truncate max-w-[200px] md:max-w-xs">
          {tenantName}
        </h3>
      </div>
    </div>
  );
}
