import { ImageVariantsProduct } from '../../../../../types';
import { ViewImage } from './ViewImage';
import { FormAddImages } from './FormAddImages';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  ScrollArea,
  Modal,
  TabsContent,
} from '@/components';

interface ModalGalleryProps {
  isGalleryModalOpen: boolean;
  hideGalleryModal: () => void;
  productSelected: ImageVariantsProduct;
  refresh: () => void;
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({
  isGalleryModalOpen,
  hideGalleryModal,
  productSelected,
  refresh,
}) => {
  return (
    <Modal
      isOpen={isGalleryModalOpen}
      onRequestClose={hideGalleryModal}
      className="max-w-fit"
    >
      <Tabs defaultValue="images" className="min-w-[70vw]">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="images">Ver imágenes</TabsTrigger>
          <TabsTrigger value="addImages">Agregar imágenes</TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[85vh]">
          <TabsContent value="images">
            <ViewImage productSelected={productSelected} refresh={refresh} />
          </TabsContent>
          <TabsContent value="addImages">
            <FormAddImages
              id={productSelected.id}
              category={productSelected.category}
              refresh={refresh}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Modal>
  );
};
