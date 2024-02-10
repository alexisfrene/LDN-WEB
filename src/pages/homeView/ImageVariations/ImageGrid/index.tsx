import React, { useContext, useEffect, useState } from 'react';
import { ImageVariantsProduct, UUID } from '../../../../types';
import { useModal } from '../../../../hooks';
import { deleteProductById, fetchProducts } from '../../../../services';
import { ModalDelete, PaginationBar, ScrollArea } from '../../../../components';
import { ModalGallery } from './ModalGallery';
import { CardImageVariations } from './CardImageVariations';
import { NavFilters } from './NavFilters';
import { LoadingContext, SnackbarContext } from '@/context';

export const ImageGrid: React.FC = () => {
  const [variationsImages, setVariationsImages] = useState<
    ImageVariantsProduct[] | []
  >([]);
  const [selectedId, setSelectedId] = useState<UUID>(
    '000-000-000-000-000-000-000-000',
  );
  const [category, setCategory] = useState<ImageVariantsProduct[]>([]);
  const [pagination, setPagination] = useState<ImageVariantsProduct[]>([]);
  const [productSelected, setProductSelected] =
    useState<ImageVariantsProduct | null>(null);
  const { showErrorSnackbar, showSuccessSnackbar } =
    useContext(SnackbarContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
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
  const handleDeleteProduct = async (id: UUID) => {
    try {
      startLoading();
      await deleteProductById(id);
      category?.length
        ? setCategory((prevProducts) =>
            prevProducts?.filter((product) => product.id !== id),
          )
        : setVariationsImages((prevProducts) =>
            prevProducts?.filter((product) => product.id !== id),
          );
      showSuccessSnackbar('Eliminado con éxito!');
    } catch (error) {
      showErrorSnackbar(`Error al eliminar un producto por id -> ${error}`);
    } finally {
      hideDeleteModal();
      stopLoading();
    }
  };
  const handlerGalleryImage = (product: ImageVariantsProduct) => {
    setProductSelected(product);
    showGalleryModal();
  };
  const refresh = async () => {
    try {
      const res = await fetchProducts();
      if (res) {
        const newData = await res.data.data;
        setVariationsImages(newData);
      }
    } catch (error) {
      showErrorSnackbar('Error al refrescar los datos');
    }
  };
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
  const fetchData = async () => {
    try {
      startLoading();
      const res = await fetchProducts();
      if (res) {
        const newData = await res.data.data;
        return setVariationsImages(newData);
      }
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-3">
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
          refresh={refresh}
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
