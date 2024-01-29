import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ModalDelete,
  ScrollArea,
  Separator,
} from '@/components';
import { ImageWithSkeleton } from '@/components/common/ImageWithSkeleton';
import { LoadingContext } from '@/context';
import { useModal } from '@/hooks';
import { removeCollection, fetchProductById } from '@/services';
import { ImageVariantsProduct } from '@/types';
import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
interface ViewImageProps {
  productSelected: ImageVariantsProduct;
  refresh: () => void;
}

export const ViewImage: React.FC<ViewImageProps> = ({
  productSelected,
  refresh,
}) => {
  const [selected, setSelected] = useState(productSelected);
  const [collectionId, setCollectionId] = useState('');
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const {
    hideModal: hideDeleteCollection,
    isOpenModal: isOpenDeleteCollection,
    showModal: showDeleteCollection,
  } = useModal();
  const handleDeleteModal = (idCollection: string) => {
    setCollectionId(idCollection);
    showDeleteCollection();
  };
  const handleRemoveCollection = async (
    idVariations: string,
    idCollection: string,
  ) => {
    try {
      startLoading();
      await removeCollection(idVariations, idCollection);
      toast('Colección eliminada', {
        description:
          'Se elimino la collection correctamente de su galería de imágenes',
      });
      await refresh();
      const newVariants = selected.variations.filter(
        (e) => e.id !== idCollection,
      );
      setSelected({ ...selected, variations: newVariants });
      hideDeleteCollection();
    } catch (error) {
      toast('Error al eliminar una colección');
    } finally {
      stopLoading();
    }
  };

  const refreshProduct = async () => {
    const res = await fetchProductById(productSelected.id);
    setSelected(res);
  };
  useEffect(() => {
    refreshProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSelected]);

  return (
    <>
      <Card className="min-h-[750px] flex flex-col">
        <CardHeader>
          <CardTitle>{selected.description?.toUpperCase()}</CardTitle>
          <CardDescription>
            Aca de muestras las diferentes images cargadas :
          </CardDescription>
        </CardHeader>
        {selected.variations?.map((variation, index) => (
          <CardContent key={index}>
            <CardHeader className="w-full">
              <CardTitle>
                <div className="flex justify-between">
                  {variation.name}
                  <div className="flex gap-1">
                    <Cog6ToothIcon className="h-6 text-slate-200 hover:text-slate-900 cursor-pointer" />
                    <TrashIcon
                      className="h-6 text-slate-200 hover:text-red-500 cursor-pointer"
                      onClick={() => handleDeleteModal(variation.id)}
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <ScrollArea className="mx-12 bg-slate-100 p-1 h-96">
              <div className="grid grid-cols-4 gap-6">
                {variation.images?.map((image: string, imageIndex: number) => (
                  <ImageWithSkeleton
                    url={`http://localhost:3001/${image}`}
                    key={imageIndex}
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
          handleRemoveCollection(selected.id, collectionId)
        }
        hideDeleteModal={hideDeleteCollection}
        isDeleteModalOpen={isOpenDeleteCollection}
      />
    </>
  );
};
