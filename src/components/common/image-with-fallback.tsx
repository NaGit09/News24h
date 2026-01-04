import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackSrc = "/placeholder.svg",
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-muted-foreground/20 border-t-muted-foreground/60 rounded-full animate-spin" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <ImageOff className="w-8 h-8 text-muted-foreground/40" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
