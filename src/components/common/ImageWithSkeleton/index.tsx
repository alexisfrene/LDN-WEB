import React, { ImgHTMLAttributes, useState } from 'react';
import { SkeletonLoading } from '../Skeleton';

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  url: string;
}
export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  url,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const handleImageLoaded = () => {
    setLoading(false);
  };

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
        className={`col-span-1 ${loading ? 'hidden' : 'block'}`}
        onLoad={handleImageLoaded}
        {...props}
      />
    </div>
  );
};
