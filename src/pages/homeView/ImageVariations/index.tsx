import React from 'react';
import { TabPanel } from 'react-tabs';
import { CreateProducts, ProductsNavBar } from '../../../components';
import { ImageGrid } from './ImageGrid';

const imageTabs = ['Ver Productos', 'Crear Producto'];
export const ImageVariations: React.FC = () => {
  return (
    <ProductsNavBar tabs={imageTabs}>
      <TabPanel>
        <ImageGrid />
      </TabPanel>
      <TabPanel>
        <CreateProducts />
      </TabPanel>
    </ProductsNavBar>
  );
};
