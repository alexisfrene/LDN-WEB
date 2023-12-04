import React from 'react';
import { ProductsNavBar } from '../../../components';
import { TabPanel } from 'react-tabs';
import { ProductGrid } from './ProductGrid';
const ProductsTabs = ['Stock de productos'];

export const LoadedProducts: React.FC = () => {
  return (
    <ProductsNavBar tabs={ProductsTabs}>
      <TabPanel>
        <ProductGrid />
      </TabPanel>
    </ProductsNavBar>
  );
};
