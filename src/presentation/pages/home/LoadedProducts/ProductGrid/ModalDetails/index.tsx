import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Modal, Tabs, TabsContent, TabsList, TabsTrigger } from '@components';
import { ProductsBySupabase } from '@src/types';
import { ProductData } from './ProductData';
import { StyleData } from './StyleData';
import { VariationData } from './VariationData';

interface ModalDetailsProps {
  productSelected: ProductsBySupabase;
  isDetailsModalOpen: boolean;
  handleCloseModal: () => void;
}
export const ModalDetails: React.FC<ModalDetailsProps> = ({
  productSelected,
  isDetailsModalOpen,
  handleCloseModal,
}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ldn-img',
    },
  });
  return (
    <Modal isOpen={isDetailsModalOpen} onRequestClose={handleCloseModal}>
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
              src={cld.image(productSelected.produc_image_url).toURL()}
              className="object-cover h-96 w-96 rounded-lg mb-3 mx-auto my-auto"
              alt={productSelected.produc_name}
            />
            <div className="h-72">
              <TabsContent value="Datos del producto">
                <ProductData
                  productSelected={productSelected}
                  reloadProducts={handleCloseModal}
                />
              </TabsContent>
              <TabsContent value="Estilos">
                <StyleData product={productSelected} />
              </TabsContent>
              <TabsContent value="Imágenes">
                <VariationData productSelected={productSelected} />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Modal>
  );
};
