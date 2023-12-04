import { filterAndMapTitles } from '../../../../../utils';
import { ProductsBySupabase } from '../../../../../types';
import { Cloudinary } from '@cloudinary/url-gen';
import { fetchProductById } from '../../../../../services';
import { useEffect, useState } from 'react';
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
    <div
      className={`col-span-3 cursor-pointer transition transform duration-150  rounded-lg border-2 p-4 flex flex-col items-center justify-center ${
        product.produc_state
          ? 'bg-orange-300 hover:bg-amber-300'
          : 'bg-slate-300 hover:bg-slate-200'
      } shadow-md`}
    >
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 mt-1 mr-1 h-8 w-8 bg-red-500 text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
      >
        X
      </button>
      <div onClick={handleClick}>
        <h3 className="text-lg font-bold mb-2">{product.produc_name}</h3>
        <img
          src={imageUrl}
          className={`object-cover h-96 w-96 rounded-md mb-2 ${
            product.produc_variations &&
            'border-2 border-amber-900 border-dashed'
          }`}
          alt={product.produc_name}
        />
        <span className="text-lg flex justify-between w-full">
          {filterAndMapTitles(product.produc_category)}
          <span
            className={`${
              product.produc_state ? 'text-green-500' : 'text-red-600'
            }`}
          >
            {product.produc_state ? 'DISPONIBLE' : 'AGOTADO'}
          </span>
          <span className="font-bold">${product.produc_price}</span>
        </span>
      </div>
    </div>
  );
};
