import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { ImageGallery } from './ImageGallery';
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
      <PlusCircleIcon
        height={100}
        className="text-green-600 hover:text-green-900 cursor-pointer"
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
