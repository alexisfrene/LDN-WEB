import React from 'react';
import {
  ScrollArea,
  TabsContent,
  MenuTabs,
} from '@components';
import { ProductData } from './ProductData';
import { StyleData } from './StyleData';
import { VariationData } from './VariationData';
import { PrimaryImage } from './PrimaryImage';


const tabs = ['Datos del producto', 'Estilos', 'Imágenes'];

interface Props {
  product: Product;
}
export const ProductDetail: React.FC<Props> = ({ product }) => {
  

  return (
    <MenuTabs tabs={tabs}>
      <div className="mt-3 flex flex-col items-center justify-center">
      <PrimaryImage product={product}/>
        <ScrollArea className="h-72">
          <TabsContent value={tabs[0]}>
            <ProductData
              category={product.category!}
              description={product.description!}
              name={product.name}
              price={product.price.toString()}
              product_id={product.product_id!}
              size={product.size!}
            />
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <StyleData
              age={product.details?.age!}
              brand={product.details?.brand!}
              color={product.details?.color!}
              gender={product.details?.gender!}
              product_id={product.product_id!}
              style={product.details?.style!}
            />
          </TabsContent>
          <TabsContent value={tabs[2]}>
            <VariationData product={product} />
          </TabsContent>
        </ScrollArea>
      </div>
    </MenuTabs>
  );
};
