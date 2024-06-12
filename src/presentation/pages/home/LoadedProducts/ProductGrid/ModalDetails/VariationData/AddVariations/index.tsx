import React, { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { Icons } from '@components';
interface AddVariationsProps {
  productSelectedId: string | null;
}

export const AddVariations: React.FC<AddVariationsProps> = ({
  productSelectedId,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="mt-3 text-xl ">
        ¿Deseas agregar más imágenes del producto?
      </h3>
      <Icons
        type="plus_circle"
        height={100}
        className="cursor-pointer text-green-600 hover:text-green-700"
        onClick={() => {
          setIsOpenModal(true);
        }}
      />
      {isOpenModal && (
        <div className="absolute -top-16 z-50 h-screen w-screen">
          <ImageGallery
            setIsOpenModal={setIsOpenModal}
            isOpenModal={isOpenModal}
            productSelectedId={productSelectedId}
          />
        </div>
      )}
    </div>
  );
};
