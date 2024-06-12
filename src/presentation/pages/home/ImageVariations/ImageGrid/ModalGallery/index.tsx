import {
  Tabs,
  TabsList,
  TabsTrigger,
  ScrollArea,
  TabsContent,
} from '@components';

const imagesTab = 'images';
const createVariation = 'addImages';

interface ModalGalleryProps {
  variationSelected: Variants;
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({
  variationSelected,
}) => {
  return (
    <div className="min-w-[70vw] max-w-fit">
      {variationSelected && (
        <Tabs defaultValue={imagesTab} className="h-[89vh]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value={imagesTab}>Información</TabsTrigger>
            <TabsTrigger value={imagesTab}>Ver imágenes</TabsTrigger>
            <TabsTrigger value={createVariation}>Agregar imágenes</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[85vh]">
            <TabsContent value={imagesTab}>
              {/* <ViewImage productSelected={selected} refresh={refresh} /> */}
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
