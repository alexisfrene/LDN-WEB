import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ScrollArea,
  TabsContent,
  MenuTabs,
  LoadingIndicator,
} from '@components';
import { ProductData } from './ProductData';
import { StyleData } from './StyleData';
import { VariationData } from './VariationData';
import { PrimaryImage } from './PrimaryImage';
import { getByIdProduct } from '@services';

const tabs = ['Datos del producto', 'Estilos', 'Imágenes'];

interface Props {
  product_id: string;
}
export const ProductDetail: React.FC<Props> = ({ product_id }) => {
  const { isPending, error, data } = useQuery<Product>({
    queryKey: ['product_detail'],
    queryFn: () => getByIdProduct(product_id),
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <MenuTabs tabs={tabs}>
      <PrimaryImage product={data} />
      <ScrollArea className="h-72">
        <TabsContent value={tabs[0]}>
          <ProductData
            category={data.category!}
            description={data.description!}
            name={data.name}
            price={data.price.toString()}
            product_id={product_id}
            size={data.size!}
          />
        </TabsContent>
        <TabsContent value={tabs[1]}>
          <StyleData
            age={data.detail?.age!}
            brand={data.detail?.brand!}
            color={data.detail?.color!}
            gender={data.detail?.gender!}
            product_id={data.product_id!}
            style={data.detail?.style!}
          />
        </TabsContent>
        <TabsContent value={tabs[2]}>
          <VariationData product={data} />
        </TabsContent>
      </ScrollArea>
    </MenuTabs>
  );
};
