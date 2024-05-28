import { fetchProductById } from '@services';
import { ImageVariantsProduct } from '@src/types';
import React, { useEffect, useState } from 'react';
interface GalleryImagesVariantsProps {
  ImageVariantsId: string | null;
}

export const Gallery: React.FC<GalleryImagesVariantsProps> = ({
  ImageVariantsId,
}) => {
  const [imageVariants, setImageVariants] =
    useState<ImageVariantsProduct | null>(null);

  const handleFetchImages = async () => {
    if (ImageVariantsId) {
      const imageSelected = await fetchProductById(ImageVariantsId);
      setImageVariants(imageSelected);
    }
  };

  useEffect(() => {
    handleFetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {imageVariants && (
        <div>
          <h3>{imageVariants.description}</h3>
          {imageVariants.variations.map((variation, index) => (
            <div key={index} className="grid grid-cols-3 gap-5">
              {variation.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={`${import.meta.env.VITE_HOST_NAME}/${image}`}
                  alt={image}
                  className="col-span-1 h-28 w-28 transform rounded object-cover shadow-md transition-all duration-300 hover:scale-105"
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
