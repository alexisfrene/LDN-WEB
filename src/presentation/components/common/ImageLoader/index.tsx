import React, { useState } from 'react';
import { SkeletonLoading } from '../Skeleton';
import { cn } from '@lib';

export const ImageLoader: React.FC<Props> = ({
  url,
  width = 60,
  height = 60,
  className,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const handleImageLoaded = () => {
    setLoading(false);
  };
  const styles = cn(
    `col-span-1 ${
      loading ? 'hidden' : 'block'
    } object-fill h-${height} w-${width} ${className}`,
  );
  return (
    <div>
      {loading && (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      )}
      <img
        src={url}
        alt="product images"
        className={styles}
        onLoad={handleImageLoaded}
        {...props}
      />
    </div>
  );
};
