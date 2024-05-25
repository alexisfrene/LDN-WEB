import React, { ImgHTMLAttributes, useState } from 'react';
import { SkeletonLoading } from '../Skeleton';
import { cn } from '@lib';

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  width?: number;
  height?: number;
  className?: string;
}
export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
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
