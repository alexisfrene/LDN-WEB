import React from 'react';
import { ProductsNavBar, TabsContent } from '@components';
import { ImageGrid } from './ViewTab';
import { CreateVariation } from './CreateTab';
const imageTabs = ['Ver imágenes', 'Crear Producto'];

export const Variations: React.FC = () => {
  return (
    <ProductsNavBar tabs={imageTabs}>
      <TabsContent value="Ver imágenes">
        <ImageGrid />
      </TabsContent>
      <TabsContent value="Crear Producto">
        <CreateVariation />
      </TabsContent>
    </ProductsNavBar>
  );
};
