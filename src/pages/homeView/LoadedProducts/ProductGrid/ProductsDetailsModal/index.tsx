import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ImagesVariants } from './ImagesVariants';
import { DataOfProducts } from './ImagesVariants/DataOfProducts';
import { Cloudinary } from '@cloudinary/url-gen';
import { ProductsBySupabase } from '../../../../../types';
import { fetchProductById } from '../../../../../services';
import { PrimaryButton } from '../../../../../components';

interface ProductsDetailsModalProps {
  productSelected: ProductsBySupabase;
  reloadProducts: () => void;
}

export const ProductsDetailsModal: React.FC<ProductsDetailsModalProps> = ({
  productSelected,
  reloadProducts,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const handleTabSelect = (index: number) => {
    setActiveTab(index);
  };
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

  const handleStylesTabs = (position: number) => {
    return `${
      activeTab === position ? 'bg-amber-600' : 'bg-amber-500'
    } p-3 rounded-lg hover:bg-amber-600 cursor-pointer transition duration-300`;
  };
  const renderTabs = () => {
    return (
      <div className="h-72">
        <TabPanel>
          <DataOfProducts
            productSelected={productSelected}
            reloadProducts={reloadProducts}
          />
        </TabPanel>
        <TabPanel>
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
        </TabPanel>
        <TabPanel>
          <ImagesVariants productSelected={productSelected} />
        </TabPanel>
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
    <div className="bg-amber-400 p-4 rounded-lg overflow-y-auto">
      <Tabs
        selectedIndex={activeTab}
        onSelect={handleTabSelect}
        key="tab-products-details"
      >
        <TabList className="flex justify-between bg-amber-300 rounded-t-lg p-2">
          <Tab>
            <PrimaryButton
              label="Datos del producto"
              additionalClasses={handleStylesTabs(0)}
            />
          </Tab>
          <Tab>
            <PrimaryButton
              label="Estilos"
              additionalClasses={handleStylesTabs(1)}
            />
          </Tab>
          <Tab>
            <PrimaryButton
              label="Imágenes"
              additionalClasses={handleStylesTabs(2)}
            />
          </Tab>
        </TabList>

        <div className="mt-3">
          <img
            src={imageUrl}
            className="object-cover h-96 w-96 rounded-lg mb-3"
            alt={produc_name}
          />
          {renderTabs()}
        </div>
      </Tabs>
    </div>
  );
};
