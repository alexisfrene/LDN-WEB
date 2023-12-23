import React from 'react';
import { ProductsNavBar, TabsContent } from '../../../components';
import { ProductGrid } from './ProductGrid';
const ProductsTabs = ['Stock de productos'];

export const LoadedProducts: React.FC = () => {
  return (
    <ProductsNavBar tabs={ProductsTabs}>
      <TabsContent value="Stock de productos">
        <ProductGrid />
      </TabsContent>
    </ProductsNavBar>
  );
};
