import React from 'react';
import { ImageVariantsProduct } from '../../../../../types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components';
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
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {product.description}
          <Button variant="destructive" onClick={onClick}>
            X
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={`http://localhost:3001/${product.miniature_image}`}
          alt={product.description}
          className="self-center rounded-t-lg w-96 object-cover border-x-4 border-t-4 transition-all duration-300 group-hover:border-amber-600 h-96 cursor-pointer"
          onClick={onCLickImage}
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
};
