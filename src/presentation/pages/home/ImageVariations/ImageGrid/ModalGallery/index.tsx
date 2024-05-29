import { ViewImage } from './ViewImage';
import { FormAddImages } from './FormAddImages';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  ScrollArea,
  Modal,
  TabsContent,
  LoadingIndicator,
} from '@components';
import { InfoImages } from './InfoImages';
import { useEffect, useState } from 'react';
import { fetchProductById } from '@services';

const infoTab = 'info';
const imagesTab = 'images';
const createVariation = 'addImages';

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
  const [selected, setSelected] = useState<ImageVariantsProduct | null>(null);

  const refreshProduct = async () => {
    const res = await fetchProductById(productSelected.id);
    setSelected(res);
  };
  useEffect(() => {
    if (isGalleryModalOpen) {
      refreshProduct();
    } else {
      setSelected(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGalleryModalOpen, productSelected, refresh]);
  return (
    <Modal
      isOpen={isGalleryModalOpen}
      onRequestClose={hideGalleryModal}
      className="min-w-[70vw] max-w-fit"
    >
      {selected ? (
        <Tabs defaultValue={infoTab} className="h-[89vh]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value={infoTab}>Información</TabsTrigger>
            <TabsTrigger value={imagesTab}>Ver imágenes</TabsTrigger>
            <TabsTrigger value={createVariation}>Agregar imágenes</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[85vh]">
            <TabsContent value={infoTab}>
              <InfoImages productSelected={selected} refresh={refresh} />
            </TabsContent>
            <TabsContent value={imagesTab}>
              <ViewImage productSelected={selected} refresh={refresh} />
            </TabsContent>
            <TabsContent value={createVariation}>
              <FormAddImages
                id={productSelected.id}
                category={selected.category}
                refresh={refresh}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      ) : (
        <span className="h-[89vh]">
          <LoadingIndicator isLoading={isGalleryModalOpen} />
        </span>
      )}
    </Modal>
  );
};
