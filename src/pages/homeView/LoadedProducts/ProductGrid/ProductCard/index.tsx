import { ProductsBySupabase } from '../../../../../types';
import { Cloudinary } from '@cloudinary/url-gen';
import { fetchProductById } from '../../../../../services';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  AspectRatio,
} from '@/components';
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
      return setImageUrl(`http://localhost:3001/${miniature_image}`);
    }
    return setImageUrl(cld.image(product.produc_image_url).toURL());
  };
  useEffect(() => {
    handleImageDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="col-span-5 lg:col-span-3 text-lg">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between ml-2">
          <p
            className={`${
              product.produc_state ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {`${product.produc_name}(${product.produc_state ? 'D' : 'A'})`}
          </p>
          <Button variant="destructive" onClick={handleClose}>
            X
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent onClick={handleClick} className="cursor-pointer">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl}
            className={`object-cover h-44 w-44 lg:w-52 lg:h-52 xl:w-96 xl:h-96 rounded-md mb-2 ${
              product.produc_variations &&
              'border-2 border-amber-900 border-dashed'
            }`}
            alt={product.produc_name}
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between mt-5">
        <p>{product.produc_size}</p>
        <p>$ {product.produc_price}</p>
      </CardFooter>
    </Card>
  );
};
