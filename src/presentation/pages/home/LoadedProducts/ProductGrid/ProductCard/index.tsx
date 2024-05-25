import { Products } from '@src/types';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  AspectRatio,
} from '@components';

interface ProductCardProps {
  product: Products;
  handleClick: () => void;
  removeProduct: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleClick,
  removeProduct,
}) => {
  return (
    <Card className="col-span-1 lg:text-xs xl:text-base">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="lg:h-6 truncate">
          <p className={`${product.state ? 'text-green-500' : 'text-red-600'}`}>
            {`${product.name}(${product.state ? 'D' : 'A'})`}
          </p>
        </CardTitle>
        <Button
          variant="destructive"
          onClick={removeProduct}
          className="lg:h-6 lg:w-6 lg:ml-3 lg:text-xs 2xl:h-8 2xl:text-base"
        >
          X
        </Button>
      </CardHeader>
      <CardContent onClick={handleClick} className="cursor-pointer">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={product.primary_image}
            className={`w-96 h-96 object-fill cursor-pointer rounded-xl lg:h-48 xl:h-64 2xl:h-56 ${
              false && 'border-2 border-amber-900 border-dashed'
            }`}
            alt={product.name}
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between lg:mt-1 2xl:mt-3">
        <p>{product.size}</p>
        <p>$ {product.price}</p>
      </CardFooter>
    </Card>
  );
};
