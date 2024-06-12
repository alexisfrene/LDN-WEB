import React from 'react';
import { ProductsNavBar, TabsContent } from '@components';
import { ProductGrid } from './ViewTab';
import { CreateProducts } from './CreateTab';
const ProductsTabs = ['Stock de productos', 'Crear producto'];

export const Products: React.FC = () => {
  return (
    <ProductsNavBar tabs={ProductsTabs}>
      <TabsContent value={ProductsTabs[0]}>
        <ProductGrid />
      </TabsContent>
      <TabsContent value={ProductsTabs[1]}>
        <CreateProducts />
      </TabsContent>
    </ProductsNavBar>
  );
};
