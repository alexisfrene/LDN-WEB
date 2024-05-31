import React from 'react';
import {
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components';
import { ProductData } from './ProductData';
import { StyleData } from './StyleData';
import { VariationData } from './VariationData';
const tabs = ['product_dates', 'styles', 'images'];

interface ModalDetailsProps {
  product: Product;
}
export const ModalDetails: React.FC<ModalDetailsProps> = ({ product }) => {
  const tabsStyles = 'text-base w-44';
  return (
    <Tabs defaultValue={tabs[0]} className="rounded-xl bg-slate-100 p-3">
      <TabsList className="flex justify-between rounded-t-lg bg-slate-100 p-2">
        <TabsTrigger value={tabs[0]} className={tabsStyles}>
          Datos del producto
        </TabsTrigger>
        <TabsTrigger value={tabs[1]} className={tabsStyles}>
          Estilos
        </TabsTrigger>
        <TabsTrigger value={tabs[2]} className={tabsStyles}>
          Imágenes
        </TabsTrigger>
      </TabsList>
      <div className="mt-3 flex flex-col items-center justify-center">
        <img
          src={product.primary_image}
          className="h-60 w-60 rounded-lg"
          alt={product.name}
        />
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
    </Tabs>
  );
};
