import React, { useState } from 'react';
import { ImageVariantsProduct } from '../../../../types';
import { useModal } from '../../../../hooks';
import { deleteProductById } from '../../../../services';
import { LoadingIndicator, ModalDelete } from '../../../../components';
import { ModalGallery } from './ModalGallery';
import { CardImageVariations } from './CardImageVariations';
import { NavFilters } from './NavFilters';
import { useDataFetching } from './hook/useDataFetchingProps';

export const ImageGrid: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [productSelected, setProductSelected] =
    useState<ImageVariantsProduct | null>(null);
  const { isLoading, variationsImages, setVariationsImages } =
    useDataFetching();
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

  return (
    <div className="grid gap-5 grid-cols-4 mx-3">
      <LoadingIndicator isLoading={isLoading} />
      <NavFilters />
      {variationsImages?.map((product) => (
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
