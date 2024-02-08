import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  ModalDelete,
} from '@/components';
import { LoadingContext } from '@/context';
import { useModal } from '@/hooks';
import { removeCollection, fetchProductById } from '@/services';
import { CollectionContent } from './CollectionContent';
import { ImageVariantsProduct } from '@/types';

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
        {selected.variations?.map((variation) => (
          <CollectionContent
            variation={variation}
            handleDeleteModal={handleDeleteModal}
          />
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
