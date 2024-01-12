import { useState, useEffect } from 'react';
import { ImagesVariants } from './ImagesVariants';
import { DataOfProducts } from './ImagesVariants/DataOfProducts';
import { Cloudinary } from '@cloudinary/url-gen';
import { ProductsBySupabase } from '../../../../../types';
import { fetchProductById } from '../../../../../services';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components';

interface ProductsDetailsModalProps {
  productSelected: ProductsBySupabase;
  reloadProducts: () => void;
}

export const ProductsDetailsModal: React.FC<ProductsDetailsModalProps> = ({
  productSelected,
  reloadProducts,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ldn-img',
    },
  });
  const {
    produc_image_url,
    produc_name,
    produc_style,
    produc_color,
    produc_age,
    produc_gender,
  } = productSelected;
  const renderTabs = () => {
    return (
      <div className="h-72">
        <TabsContent value="Datos del producto">
          <DataOfProducts
            productSelected={productSelected}
            reloadProducts={reloadProducts}
          />
        </TabsContent>
        <TabsContent value="Estilos">
          <div className="info-item text-lg mb-2">{`Estilo: ${
            produc_style ?? 'Sin definir'
          }`}</div>
          <div className="info-item text-lg mb-2">{`Color: ${
            produc_color ?? 'Sin color'
          }`}</div>
          <div className="info-item text-lg mb-2">{`Edad: ${
            produc_age ?? 'Sin definir'
          }`}</div>
          <div className="info-item text-lg mb-2">{`Género: ${
            produc_gender ?? 'Sin definir'
          }`}</div>
        </TabsContent>
        <TabsContent value="Imágenes">
          <ImagesVariants productSelected={productSelected} />
        </TabsContent>
      </div>
    );
  };
  const handleImageDestination = async () => {
    if (productSelected.produc_variations) {
      const { miniature_image } = await fetchProductById(
        productSelected.produc_variations,
      );

      return setImageUrl(`http://localhost:3001/${miniature_image}`);
    }

    return setImageUrl(cld.image(produc_image_url).toURL());
  };

  useEffect(() => {
    handleImageDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-lg overflow-y-auto">
      <Tabs defaultValue="Datos del producto">
        <TabsList className="flex justify-between rounded-t-lg p-2">
          <TabsTrigger value="Datos del producto">
            Datos del producto
          </TabsTrigger>
          <TabsTrigger value="Estilos">Estilos</TabsTrigger>
          <TabsTrigger value="Imágenes">Imágenes</TabsTrigger>
        </TabsList>
        <div className="mt-3 flex justify-center items-center flex-col">
          <img
            src={imageUrl}
            className="object-cover h-96 w-96 rounded-lg mb-3 mx-auto my-auto"
            alt={produc_name}
          />
          {renderTabs()}
        </div>
      </Tabs>
    </div>
  );
};
