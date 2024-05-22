import React from 'react';
import { ProductsNavBar, TabsContent } from '@components';
import { ProductGrid } from './ProductGrid';
import { CreateProducts } from './CreateProducts';
const ProductsTabs = ['Stock de productos', 'Crear producto'];

export const LoadedProducts: React.FC = () => {
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
