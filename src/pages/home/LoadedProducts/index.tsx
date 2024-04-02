import React from 'react';
import { ProductsNavBar, TabsContent } from '../../../components';
import { ProductGrid } from './ProductGrid';
import { CreateProducts } from './CreateProducts';
const ProductsTabs = ['Stock de productos', 'Crear producto'];

export const LoadedProducts: React.FC = () => {
  return (
    <ProductsNavBar tabs={ProductsTabs}>
      <TabsContent value="Stock de productos">
        <ProductGrid />
      </TabsContent>
      <TabsContent value="Crear producto">
        <CreateProducts />
      </TabsContent>
    </ProductsNavBar>
  );
};
