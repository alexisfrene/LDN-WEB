/* eslint-disable react-hooks/exhaustive-deps */
import { getAvailableProductCountByVariationId } from '@src/services';
import { ImageVariantsProduct } from '@src/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@components';
import { useEffect, useState } from 'react';

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
  const [cant, setCant] = useState(0);
  const getProductCount = async () => {
    const res = await getAvailableProductCountByVariationId(product.id);
    if (res) {
      setCant(res);
    }
  };
  useEffect(() => {
    getProductCount();
  }, []);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex justify-between lg:text-sm">
          {`${product.description}(${cant}) `}
          <Button
            variant="destructive"
            onClick={onClick}
            className="lg:h-6 lg:w-6 lg:text-xs 2xl:h-8 2xl:text-base"
          >
            X
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <img
          src={`${import.meta.env.VITE_HOST_NAME}/${product.miniature_image}`}
          alt={product.description}
          className="w-96 h-96 object-fill cursor-pointer rounded-xl lg:h-52 2xl:h-56"
          onClick={onCLickImage}
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
};
