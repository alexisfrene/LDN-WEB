import React, { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { Icons } from '@/components';
interface AddVariationsProps {
  productSelectedId: string | null;
}

export const AddVariations: React.FC<AddVariationsProps> = ({
  productSelectedId,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-xl mt-3 ">
        ¿Deseas agregar más imágenes del producto?
      </h3>
      <Icons
        type="plus_circle"
        height={100}
        className="text-green-600 hover:text-green-700 cursor-pointer"
        onClick={() => {
          setIsOpenModal(true);
        }}
      />
      {isOpenModal && (
        <div className="absolute z-50 w-screen h-screen -top-16">
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
