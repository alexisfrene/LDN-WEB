import React from 'react';
import { Products } from '@src/types';
import { Gallery } from './Gallery';
import { AddVariations } from './AddVariations';

interface ImagesVariantsProps {
  product: Products;
}

export const VariationData: React.FC<ImagesVariantsProps> = ({ product }) => {
  return (
    <div>
      {/* {false? (
        <Gallery ImageVariantsId={productSelected.produc_variations} />
      ) : (
        <AddVariations productSelectedId={product.code || null} />
      )} */}
    </div>
  );
};
