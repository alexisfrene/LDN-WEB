import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ModalDelete,
  ScrollArea,
  Separator,
  TabsContent,
} from '@/components';
import { useModal } from '@/hooks';
import { removeCollection } from '@/services';
import { ImageVariantsProduct } from '@/types';
import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
interface ViewImageProps {
  productSelected: ImageVariantsProduct;
}

export const ViewImage: React.FC<ViewImageProps> = ({ productSelected }) => {
  const [collectionId, setCollectionId] = useState('');
  const {
    hideModal: hideDeleleCollection,
    isOpenModal: isOpenDeleteCollection,
    showModal: showDeleteCollection,
  } = useModal();
  const handlehowDeleteModal = (idCollection: string) => {
    setCollectionId(idCollection);
    showDeleteCollection();
  };
  const handleRemoveCollection = async (
    idVariations: string,
    idCollection: string,
  ) => {
    await removeCollection(idVariations, idCollection);
  };

  return (
    <TabsContent value="images">
      <Card className="min-h-[750px] flex flex-col">
        <CardHeader>
          <CardTitle>{productSelected.description?.toUpperCase()}</CardTitle>
          <CardDescription>
            Aca de muestras las diferentes images cargadas :
          </CardDescription>
        </CardHeader>
        {productSelected.variations?.map((variation, index) => (
          <CardContent key={index}>
            <CardHeader className="w-full">
              <CardTitle>
                <div className="flex justify-between">
                  {variation.name}
                  <div className="flex gap-1">
                    <Cog6ToothIcon className="h-6 text-slate-200 hover:text-slate-900 cursor-pointer" />
                    <TrashIcon
                      className="h-6 text-slate-200 hover:text-red-500 cursor-pointer"
                      onClick={() => handlehowDeleteModal(variation.id)}
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <ScrollArea className="h-80 mx-12 bg-slate-200">
              <div className="flex flex-wrap gap-1 justify-center">
                {variation.images?.map((image: string, imageIndex: number) => (
                  <img
                    key={imageIndex}
                    src={`http://localhost:3001/${image}`}
                    loading="lazy"
                    alt={`Image ${imageIndex + 1}`}
                    className="col-span-1 h-80 w-80"
                  />
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
          </CardContent>
        ))}
      </Card>
      <ModalDelete
        handleDeleteProduct={() =>
          handleRemoveCollection(productSelected.id, collectionId)
        }
        hideDeleteModal={hideDeleleCollection}
        isDeleteModalOpen={isOpenDeleteCollection}
      />
    </TabsContent>
  );
};
