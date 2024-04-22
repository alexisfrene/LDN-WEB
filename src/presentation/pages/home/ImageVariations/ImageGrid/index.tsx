import React, { useContext, useEffect, useState } from 'react';
import { ModalGallery } from './ModalGallery';
import { CardImageVariations } from './CardImageVariations';
import { NavFilters } from './NavFilters';
import { useModal } from '@presentation/hooks';
import { deleteProductById, fetchProducts } from '@services';
import {
  LoadingIndicator,
  ModalDelete,
  PaginationBar,
  ScrollArea,
} from '@components';
import { SnackbarContext } from '@presentation/context';
import { ImageVariantsProduct, UUID } from '@src/types';

export const ImageGrid: React.FC = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
      setLoading(false);
    }
  };
  const handlerGalleryImage = (product: ImageVariantsProduct) => {
    setProductSelected(product);
    showGalleryModal();
  };
  const refresh = async () => {
    const res = await fetchProducts();
    if (res) {
      const newData = await res.data.data;
      if (category?.length) return setCategory(newData);
      setVariationsImages(newData);
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
    setLoading(true);
    const res = await fetchProducts();
    if (res) {
      const newData = await res.data.data;
      setVariationsImages(newData);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-3">
      <NavFilters setState={setCategory} />
      <ScrollArea className="lg:h-[69vh] xl:h-[68vh] 2xl:h-[72vh] col-span-full">
        <div className="grid gap-3 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
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
      <LoadingIndicator isLoading={loading} />
    </div>
  );
};
