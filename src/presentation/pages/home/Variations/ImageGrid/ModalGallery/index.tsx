import {
  Tabs,
  TabsList,
  TabsTrigger,
  ScrollArea,
  TabsContent,
} from '@components';
import { GalleryTab } from './GalleryTab';

const imagesTab = 'images';
const createVariation = 'addImages';

interface ModalGalleryProps {
  variationSelected: Variants;
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({
  variationSelected,
}) => {
  return (
    <div>
      {variationSelected && (
        <Tabs defaultValue={imagesTab} className="h-[80vh]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value={imagesTab}>Ver imágenes</TabsTrigger>
            <TabsTrigger value={createVariation}>Agregar imágenes</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[85vh]">
            <TabsContent value={imagesTab}>
              <GalleryTab variation={variationSelected} />
            </TabsContent>
            <TabsContent value={createVariation}>
              {/* <FormAddImages
                id={productSelected.variation_id}
                category={selected}
                refresh={refresh}
              /> */}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      )}
    </div>
  );
};
