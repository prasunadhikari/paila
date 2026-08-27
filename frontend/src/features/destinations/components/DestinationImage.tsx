import { useState } from "react";

type DestinationImageProps = {
  title: string;
  alt: string;
  className?: string;
};

export default function DestinationImage({
  title,
  alt,
  className = "",
}: DestinationImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-200 text-slate-500 ${className}`}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={title}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setImageError(true)}
    />
  );
}