import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

/**
 * A wrapper around <img> that catches load failures and displays a fallback icon/placeholder.
 */
export default function ImageWithFallback({ 
  src, 
  alt = '', 
  className = '', 
  fallbackIcon: FallbackIcon = ImageIcon 
}) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [error, setError] = useState(!src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setError(!src);
  }

  if (error) {
    return (
      <div className="w-full h-full min-h-[inherit] flex items-center justify-center text-slate-300 bg-slate-950/5">
        <FallbackIcon className="h-10 w-10 stroke-[1.5]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
