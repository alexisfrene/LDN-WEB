import React from 'react';
import { ProductsNavBar, TabsContent } from '@components';
import { ImageGrid } from './ImageGrid';
import { CreateProducts } from './CreateProducs';
const imageTabs = ['Ver imágenes', 'Crear Producto'];

export const ImageVariations: React.FC = () => {
  return (
    <ProductsNavBar tabs={imageTabs}>
      <TabsContent value="Ver imágenes">
        <ImageGrid />
      </TabsContent>
      <TabsContent value="Crear Producto">
        <CreateProducts />
      </TabsContent>
    </ProductsNavBar>
  );
};
