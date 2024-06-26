import {
  ScrollArea,
  TabsContent,
  MenuTabs,
  LoadingIndicator,
} from '@components';
import { GalleryTab } from './GalleryTab';
import { CollectionTab } from './CollectionTab';
import { getVariationById } from '@src/services';
import { useQuery } from '@tanstack/react-query';

const tabs = ['Ver imágenes', 'Agregar una colección'];

interface Props {
  variationId: string;
}

export const VariationDetail: React.FC<Props> = ({ variationId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['variation_detail', 'variations'],
    queryFn: () => getVariationById(variationId),
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;
  return (
    <MenuTabs tabs={tabs}>
      {data && (
        <ScrollArea className="h-[85vh]">
          <TabsContent value={tabs[0]}>
            <GalleryTab variation={data} />
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <CollectionTab variationId={data.variation_id} />
          </TabsContent>
        </ScrollArea>
      )}
    </MenuTabs>
  );
};
