import Image from "next/image";

interface AdecuacionInfoProps {
  name: string;
  description?: string | null;
  details?: Record<string, any> | null;
  brandName?: string;
  brandLogoUrl?: string | null;
  categoryName?: string;
}

export default function AdecuacionInfo({
  name,
  description,
  details,
  brandName,
  brandLogoUrl,
  categoryName,
}: AdecuacionInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        {categoryName && (
          <p className="text-[#8F909A] text-sm uppercase tracking-wide mb-2">
            {categoryName}
          </p>
        )}
        {brandName && (
          <div className="flex items-center gap-3 mb-3">
            {brandLogoUrl && (
              <Image
                src={brandLogoUrl}
                alt={brandName}
                width={40}
                height={40}
                className="object-contain"
              />
            )}
            <span className="text-[#8F909A] text-sm uppercase tracking-wide">
              {brandName}
            </span>
          </div>
        )}
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-extrabold text-[#003593]">
          {name}
        </h1>
      </div>

      {description && (
        <div>
          <h2 className="text-lg font-semibold text-[#0D263B] mb-2">
            Descripción
          </h2>
          <p className="text-[#7C8893] text-base leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {details && Object.keys(details).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[#0D263B] mb-3">
            Especificaciones
          </h2>
          <div className="border rounded-lg overflow-hidden">
            {Object.entries(details).map(([key, value], index) => (
              <div
                key={key}
                className={`flex justify-between py-3 px-4 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <span className="text-[#8F909A] capitalize font-medium">
                  {key}
                </span>
                <span className="font-semibold text-[#0D263B]">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
