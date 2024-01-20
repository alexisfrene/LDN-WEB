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
      <CardContent className="flex justify-center">
        <img
          src={`http://localhost:3001/${product.miniature_image}`}
          alt={product.description}
          className="rounded-lg w-96 h-96 object-cover border-4 cursor-pointer"
          onClick={onCLickImage}
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
};
