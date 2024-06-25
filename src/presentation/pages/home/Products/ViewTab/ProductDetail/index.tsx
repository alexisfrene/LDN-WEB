import React, { useEffect, useState } from 'react';
import { ScrollArea, TabsContent, MenuTabs } from '@components';
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
  const [data, setProduct] = useState<Product>({
    name: '-',
    price: 0,
    size_id: '-',
    size_value: '-',
    category: '-',
    category_id: '-',
    category_value: '-',
    code: 0,
    description: '-',
  });
  useEffect(() => {
    (async () => {
      const res = await await getByIdProduct(product_id);
      setProduct(res);
    })();
  }, []);

  return (
    <MenuTabs tabs={tabs}>
      <ScrollArea className="min-h-72">
        {data && (
          <>
            <PrimaryImage product={data} />
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
          </>
        )}
      </ScrollArea>
    </MenuTabs>
  );
};
