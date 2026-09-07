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
    <div className="w-full bg-gradient-to-r from-[#003593] to-[#3559B6] rounded-xl p-6 md:p-8 text-white mb-2">
      <div className="flex items-center gap-4">
        {tenantLogo ? (
          <Image
            src={tenantLogo}
            alt={tenantName}
            width={64}
            height={64}
            className="rounded-full object-cover bg-white"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#D9A300] flex items-center justify-center text-white text-2xl font-bold">
            {tenantName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-xs md:text-sm opacity-80 uppercase tracking-wide mb-1">
            {categoryName}
          </p>
          <h3 className="text-xl md:text-2xl font-bold">{tenantName}</h3>
        </div>
      </div>
    </div>
  );
}
