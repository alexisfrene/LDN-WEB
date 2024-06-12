import { ScrollArea, TabsContent, MenuTabs } from '@components';
import { GalleryTab } from './GalleryTab';
import { CollectionTab } from './CollectionTab';

const tabs = ['Ver imágenes', 'Agregar imágenes'];

interface Props {
  variationSelected: Variants;
}

export const VariationDetail: React.FC<Props> = ({ variationSelected }) => {
  return (
    <MenuTabs tabs={tabs}>
      {variationSelected && (
        <ScrollArea className="h-[85vh]">
          <TabsContent value={tabs[0]}>
            <GalleryTab variation={variationSelected} />
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <CollectionTab variationId={variationSelected.variation_id} />
          </TabsContent>
        </ScrollArea>
      )}
    </MenuTabs>
  );
};
