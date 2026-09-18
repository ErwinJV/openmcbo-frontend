// components/Thumbnail.tsx
import Image from "next/image";

interface ThumbnailProps {
  src: string;
  alt: string;

  isActive: boolean;
  onClick: () => void;
}

export default function Thumbnail({
  src,
  alt,

  isActive,
  onClick,
}: ThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`thumb-item relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-subtle p-0.5 transition-all duration-150 focus:outline-none ${
        isActive
          ? "border-2 border-brand-500 opacity-100 shadow-sm"
          : "border border-line opacity-75 hover:opacity-100 hover:border-brand-400"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover rounded-lg"
      />
    </button>
  );
}
