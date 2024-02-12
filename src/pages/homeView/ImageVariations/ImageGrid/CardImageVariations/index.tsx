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
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex justify-between lg:text-sm">
          {product.description}
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
          src={`http://localhost:3001/${product.miniature_image}`}
          alt={product.description}
          className="w-96 h-96 object-fill cursor-pointer rounded-xl lg:h-52 2xl:h-56"
          onClick={onCLickImage}
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
};
