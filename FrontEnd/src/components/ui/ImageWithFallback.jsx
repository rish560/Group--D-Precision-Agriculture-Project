import { useState } from 'react';

export const ImageWithFallback = ({ src, alt = '', className = '', fallback }) => {
  const [error, setError] = useState(false);
  const fallbackSrc = fallback || `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23eef6ec'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%234b6b4a'>Image unavailable</text></svg>`;

  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img
      src={error || !src ? fallbackSrc : src}
      alt={alt || 'image'}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

export default ImageWithFallback;
