import React from 'react';
import {
  CreateProducts,
  ProductsNavBar,
  TabsContent,
} from '../../../components';
import { ImageGrid } from './ImageGrid';
const imageTabs = ['Ver imagenes', 'Crear Producto'];

export const ImageVariations: React.FC = () => {
  return (
    <ProductsNavBar tabs={imageTabs}>
      <TabsContent value="Ver imagenes">
        <ImageGrid />
      </TabsContent>
      <TabsContent value="Crear Producto">
        <CreateProducts />
      </TabsContent>
    </ProductsNavBar>
  );
};
