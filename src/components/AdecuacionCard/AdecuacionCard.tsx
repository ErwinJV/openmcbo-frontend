import Image from "next/image";
import Link from "next/link";

interface AdecuacionCardProps {
  id: string;
  name: string;
  slug?: string | null;
  mainImageUrl?: string | null;
  brandName?: string;
  tenantName?: string;
}

export default function AdecuacionCard({
  id,
  name,
  slug,
  mainImageUrl,
  brandName,
  tenantName,
}: AdecuacionCardProps) {
  const hasImage = !!mainImageUrl;
  const adecuacionSlug = slug || id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/adecuaciones/${adecuacionSlug}`} className="block">
        <div className="relative h-48 md:h-64 bg-gray-100 flex items-center justify-center">
          {hasImage ? (
            <Image
              src={mainImageUrl!}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ) : (
            <span className="text-[#8F909A] text-sm">Sin imagen</span>
          )}
        </div>
      </Link>
      <div className="p-4">
        {brandName && (
          <p className="text-[#8F909A] text-xs md:text-sm uppercase tracking-wide mb-1">
            {brandName}
          </p>
        )}
        <h4 className="font-semibold text-[#0D263B] text-sm md:text-base line-clamp-2 mb-2">
          {name}
        </h4>
        {tenantName && (
          <p className="text-[#7C8893] text-xs md:text-sm mb-2">
            {tenantName}
          </p>
        )}
        <Link
          href={`/adecuaciones/${adecuacionSlug}`}
          className="mt-3 inline-block text-[#D9A300] text-sm font-semibold hover:underline"
        >
          Ver detalles →
        </Link>
      </div>
    </div>
  );
}
