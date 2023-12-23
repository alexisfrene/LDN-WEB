import { Modal } from '../../../../../components';
import { ImageVariantsProduct } from '../../../../../types';
import { Tabs, TabsList, TabsTrigger, ScrollArea } from '@/components/ui';
import { ViewImage } from './ViewImage';
import { FormAddImages } from './FormAddImages';

interface ModalGalleryProps {
  isGalleryModalOpen: boolean;
  hideGalleryModal: () => void;
  productSelected: ImageVariantsProduct;
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({
  isGalleryModalOpen,
  hideGalleryModal,
  productSelected,
}) => {
  return (
    <Modal isOpen={isGalleryModalOpen} onRequestClose={hideGalleryModal}>
      <Tabs defaultValue="images">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="images">Ver imagenes</TabsTrigger>
          <TabsTrigger value="addImages">Agregar imagenes</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[800px] w-[1200px]">
          <ViewImage productSelected={productSelected} />
          <FormAddImages
            id={productSelected.id}
            category={productSelected.category}
          />
        </ScrollArea>
      </Tabs>
    </Modal>
  );
};
