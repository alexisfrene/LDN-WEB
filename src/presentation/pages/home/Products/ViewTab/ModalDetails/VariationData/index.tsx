import React from 'react';
// import { Gallery } from './Gallery';
// import { AddVariations } from './AddVariations';

interface ImagesVariantsProps {
  product: Product;
}

export const VariationData: React.FC<ImagesVariantsProps> = () => {
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
