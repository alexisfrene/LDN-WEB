import React, { useState } from 'react';
import { ImageVariantsProduct } from '../../../../types';
import { useAsync, useFetchAndLoad, useModal } from '../../../../hooks';
import { deleteProductById, fetchProducts } from '../../../../services';
import { LoadingIndicator, ModalDelete } from '../../../../components';
import { ModalGallery } from './ModalGallery';
import { CardImageVariations } from './CardImageVariations';

export const ImageGrid: React.FC = () => {
  const [variationsImages, setVariationsImages] = useState<
    ImageVariantsProduct[] | []
  >([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [productSelected, setProductSelected] =
    useState<ImageVariantsProduct | null>(null);
  const {
    hideModal: hideGalleryModal,
    isOpenModal: isGalleryModalOpen,
    showModal: showGalleryModal,
  } = useModal();
  const {
    hideModal: hideDeleteModal,
    isOpenModal: isDeleteModalOpen,
    showModal: showDeleteModal,
  } = useModal();
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      setVariationsImages((prevProducts) =>
        prevProducts?.filter((product) => product.id !== id),
      );
      hideDeleteModal();
    } catch (error) {
      console.error('Error al eliminar un producto por id');
    }
  };
  const handlerGalleryImage = (product: ImageVariantsProduct) => {
    setProductSelected(product);
    showGalleryModal();
  };
  const { loading, callEndpoint } = useFetchAndLoad();
  const getImageVariations = async () => await callEndpoint(fetchProducts());
  useAsync(getImageVariations, (data) => setVariationsImages(data.data));

  return (
    <div className="grid gap-5 grid-cols-4 mx-3">
      <LoadingIndicator isLoading={!variationsImages.length} />
      {!loading &&
        variationsImages?.map((product) => (
          <CardImageVariations
            key={product.id}
            product={product}
            onClick={() => {
              setSelectedId(product.id);
              showDeleteModal();
            }}
            onCLickImage={() => handlerGalleryImage(product)}
          />
        ))}
      {productSelected && (
        <ModalGallery
          isGalleryModalOpen={isGalleryModalOpen}
          hideGalleryModal={hideGalleryModal}
          productSelected={productSelected}
        />
      )}
      <ModalDelete
        isDeleteModalOpen={isDeleteModalOpen}
        hideDeleteModal={hideDeleteModal}
        handleDeleteProduct={() => handleDeleteProduct(selectedId)}
      />
    </div>
  );
};
