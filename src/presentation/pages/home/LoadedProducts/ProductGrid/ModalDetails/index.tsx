import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components';
import { Products } from '@src/types';
import { ProductData } from './ProductData';
import { StyleData } from './StyleData';
import { VariationData } from './VariationData';

interface ModalDetailsProps {
  product: Products;
}
export const ModalDetails: React.FC<ModalDetailsProps> = ({ product }) => {
  return (
    <div className="rounded-lg overflow-y-auto mt-2">
      <Tabs defaultValue="Datos del producto">
        <TabsList className="flex justify-between rounded-t-lg p-2 bg-slate-100">
          <TabsTrigger value="Datos del producto" className="text-xl">
            Datos del producto
          </TabsTrigger>
          <TabsTrigger value="Estilos" className="text-xl">
            Estilos
          </TabsTrigger>
          <TabsTrigger value="Imágenes" className="text-xl">
            Imágenes
          </TabsTrigger>
        </TabsList>
        <div className="mt-3 flex justify-center items-center flex-col">
          <img
            src={product.primary_image}
            className="object-cover h-96 w-96 rounded-lg mb-3 mx-auto my-auto"
            alt={product.name}
          />
          <div className="h-72">
            <TabsContent value="Datos del producto">
              <ProductData product={product} />
            </TabsContent>
            <TabsContent value="Estilos">
              <StyleData product={product} />
            </TabsContent>
            <TabsContent value="Imágenes">
              <VariationData product={product} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
