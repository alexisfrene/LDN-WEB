import { ProductsBySupabase } from '@src/types';
import { Cloudinary } from '@cloudinary/url-gen';
import { fetchProductById } from '@services';
import { useEffect, useState } from 'react';
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
  product: ProductsBySupabase;
  handleClick: () => void;
  handleClose: () => void;
}
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleClick,
  handleClose,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ldn-img',
    },
  });
  const handleImageDestination = async () => {
    if (product.produc_variations) {
      const { miniature_image } = await fetchProductById(
        product.produc_variations,
      );
      return setImageUrl(
        `${import.meta.env.VITE_HOST_NAME}/${miniature_image}`,
      );
    }
    return setImageUrl(cld.image(product.produc_image_url).toURL());
  };
  useEffect(() => {
    handleImageDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="col-span-1 lg:text-xs xl:text-base">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="lg:h-6 truncate">
          <p
            className={`${
              product.produc_state ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {`${product.produc_name}(${product.produc_state ? 'D' : 'A'})`}
          </p>
        </CardTitle>
        <Button
          variant="destructive"
          onClick={handleClose}
          className="lg:h-6 lg:w-6 lg:ml-3 lg:text-xs 2xl:h-8 2xl:text-base"
        >
          X
        </Button>
      </CardHeader>
      <CardContent onClick={handleClick} className="cursor-pointer">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl}
            className={`w-96 h-96 object-fill cursor-pointer rounded-xl lg:h-48 xl:h-64 2xl:h-56 ${
              product.produc_variations &&
              'border-2 border-amber-900 border-dashed'
            }`}
            alt={product.produc_name}
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between lg:mt-1 2xl:mt-3">
        <p>{product.produc_size}</p>
        <p>$ {product.produc_price}</p>
      </CardFooter>
    </Card>
  );
};
