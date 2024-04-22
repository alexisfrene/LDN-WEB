import React from 'react';
import { ProductsBySupabase } from '@src/types';
import { Gallery } from './Gallery';
import { AddVariations } from './AddVariations';

interface ImagesVariantsProps {
  productSelected: ProductsBySupabase;
}

export const VariationData: React.FC<ImagesVariantsProps> = ({
  productSelected,
}) => {
  return (
    <div>
      {productSelected.produc_variations ? (
        <Gallery ImageVariantsId={productSelected.produc_variations} />
      ) : (
        <AddVariations productSelectedId={productSelected.id || null} />
      )}
    </div>
  );
};
