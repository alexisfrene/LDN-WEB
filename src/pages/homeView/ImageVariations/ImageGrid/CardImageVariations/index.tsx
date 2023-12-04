import React from 'react';
import { ImageVariantsProduct } from '../../../../../types';
interface CardImageVariationsProps {
  product: ImageVariantsProduct;
  onClick: () => void;
  onCLickImage: () => void;
}

export const CardImageVariations: React.FC<CardImageVariationsProps> = ({
  product,
  onClick,
  onCLickImage,
}) => {
  return (
    <span
      className="group bg-gradient-to-t from-amber-600 via-amber-100 to-orange-400 cursor-pointer rounded-xl "
      key={product.id}
    >
      <div className="rounded-xl border-4 col-span-1 group-hover:border-amber-600 shadow-sm hover:shadow-xl relative transition-all duration-300 ">
        <button
          className="bg-white h-9 w-9 absolute top-0 right-0 transition-all duration-300"
          onClick={onClick}
        >
          X
        </button>
        <h3 className="text-lg bg-amber-600 truncate h-9 flex items-center justify-center transition-all duration-300 rounded-t33-xl">
          {product.description}
        </h3>

        <div className="flex flex-col items-center">
          <h4 className="text-base transition-all duration-300">
            {product.category}
          </h4>
          <img
            src={`http://localhost:3001/${product.miniature_image}`}
            alt={product.description}
            className="self-center rounded-t-lg w-96 object-cover border-x-4 border-t-4 transition-all duration-300 group-hover:border-amber-600 h-96"
            onClick={onCLickImage}
            loading="lazy"
          />
        </div>
      </div>
    </span>
  );
};
