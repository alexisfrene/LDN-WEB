import React, { useState } from 'react';
import { SkeletonLoading } from '../Skeleton';

export const ImageWithSkeleton: React.FC<{ url: string }> = ({ url }) => {
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
        className={`col-span-1 h-80 w-80 ${loading ? 'hidden' : 'block'}`}
        onLoad={handleImageLoaded}
      />
    </div>
  );
};
