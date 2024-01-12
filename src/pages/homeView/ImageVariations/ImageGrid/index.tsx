import React, { useState } from 'react';
import { ImageVariantsProduct } from '../../../../types';
import { useModal } from '../../../../hooks';
import { deleteProductById } from '../../../../services';
import {
  LoadingIndicator,
  ModalDelete,
  PaginationBar,
  ScrollArea,
} from '../../../../components';
import { ModalGallery } from './ModalGallery';
import { CardImageVariations } from './CardImageVariations';
import { NavFilters } from './NavFilters';
import { useDataFetching } from './hook/useDataFetchingProps';

export const ImageGrid: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [category, setCategory] = useState<ImageVariantsProduct[]>([]);
  const [pagination, setPagination] = useState<ImageVariantsProduct[]>([]);
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
  const { isLoading, variationsImages, setVariationsImages } =
    useDataFetching();
  const productsToMap = category?.length ? category : variationsImages;
  const renderProductCard = (product: ImageVariantsProduct) => (
    <CardImageVariations
      key={product.id}
      product={product}
      onClick={() => {
        setSelectedId(product.id);
        showDeleteModal();
      }}
      onCLickImage={() => handlerGalleryImage(product)}
    />
  );

  return (
    <div className="mx-3">
      <LoadingIndicator isLoading={isLoading} />
      <NavFilters setState={setCategory} />
      <ScrollArea className="h-[70vh] col-span-full">
        <div className="grid gap-5 grid-cols-4 mx-3">
          {pagination && pagination.map(renderProductCard)}
        </div>
      </ScrollArea>
      <PaginationBar data={productsToMap} setState={setPagination} />
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
