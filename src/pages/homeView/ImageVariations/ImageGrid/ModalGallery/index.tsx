import { ImageVariantsProduct } from '../../../../../types';
import { ViewImage } from './ViewImage';
import { FormAddImages } from './FormAddImages';
import { Tabs, TabsList, TabsTrigger, ScrollArea, Modal } from '@/components';

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
    <Modal
      isOpen={isGalleryModalOpen}
      onRequestClose={hideGalleryModal}
      className="max-w-fit"
    >
      <Tabs defaultValue="images">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="images">Ver imágenes</TabsTrigger>
          <TabsTrigger value="addImages">Agregar imágenes</TabsTrigger>
        </TabsList>
        <ScrollArea>
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
