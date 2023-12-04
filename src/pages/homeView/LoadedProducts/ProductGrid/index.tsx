import React, { useState } from 'react';
import { ProductsBySupabase } from '../../../../types';
import {
  getProductsBySupabase,
  handleFilterSubmit,
  removeProductsBySupabase,
} from '../../../../services';
import { NavFilters } from './NavFilters';
import { ProductCard } from './ProductCard';
import { LoadingIndicator } from '../../../../components';
import { ModalCategory } from './ModalCategory';
import { useAsync, useFetchAndLoad, useModal } from '../../../../hooks';
import { ModalSize } from './ModalSize';
import { ModalDelete } from './ModalDelete';
import { ModalDetails } from './ModalDetails';
interface Filters {
  category: string;
  size: string;
}
export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductsBySupabase[] | null>([]);
  const [removeId, setRemoveId] = useState<string>('');
  const [productSelected, setProductSelected] =
    useState<ProductsBySupabase | null>(null);
  const [filter, setFilter] = useState<Filters>({
    category: '',
    size: '',
  });
  const {
    hideModal: hideCategoryModal,
    isOpenModal: isCategoryModalOpen,
    showModal: showCategoryModal,
  } = useModal();
  const {
    hideModal: hideSizeModal,
    isOpenModal: isSizeModalOpen,
    showModal: showSizeModal,
  } = useModal();
  const {
    hideModal: hideDeleteModal,
    isOpenModal: isDeleteModalOpen,
    showModal: showDeleteModal,
  } = useModal();
  const {
    hideModal: hideDetailsModal,
    isOpenModal: isDetailsModalOpen,
    showModal: showDetailsModal,
  } = useModal();

  const handleRemoveProduct = async () => {
    await removeProductsBySupabase(removeId);
    await handleFilterSubmit(filter, setProducts);
  };
  const sortProductsByPrice = (direction: '+' | '-') => {
    if (products) {
      const sortedProducts = [...products];
      setProducts(
        direction === '+'
          ? sortedProducts.sort((a, b) => b.produc_price - a.produc_price)
          : sortedProducts.sort((a, b) => a.produc_price - b.produc_price),
      );
    }
  };
  const handleFilterClick = (selectedFilter: string, filterType: string) => {
    setFilter({
      ...filter,
      [filterType]: selectedFilter,
    });
  };
  const { callEndpoint } = useFetchAndLoad();
  const getProducs = async () => await callEndpoint(getProductsBySupabase());
  useAsync(getProducs, (data) => setProducts(data.slice(1, 13)));

  return (
    <div className="grid grid-cols-12 gap-3 mx-5">
      <NavFilters
        onCategoryClick={showCategoryModal}
        onSizeClick={showSizeModal}
        onFilterSubmit={() => handleFilterSubmit(filter, setProducts)}
        filter={filter}
        setFilter={setFilter}
        orderByPrice={sortProductsByPrice}
      />
      {products?.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          handleClick={() => {
            showDetailsModal();
            setProductSelected(product);
          }}
          handleClose={() => {
            setRemoveId(product.id);
            showDeleteModal();
          }}
        />
      ))}
      <ModalCategory
        isCategoryModalOpen={isCategoryModalOpen}
        handleFilterClick={handleFilterClick}
        handleCloseModal={hideCategoryModal}
        filter={filter}
      />
      <ModalSize
        isSizeModalOpen={isSizeModalOpen}
        handleFilterClick={handleFilterClick}
        handleCloseModal={hideSizeModal}
        filter={filter}
      />
      <ModalDelete
        isDeleteModalOpen={isDeleteModalOpen}
        handleRemoveProduct={handleRemoveProduct}
        handleCloseModal={hideDeleteModal}
      />
      {productSelected && (
        <ModalDetails
          productSelected={productSelected}
          isDetailsModalOpen={isDetailsModalOpen}
          handleCloseModal={hideDetailsModal}
        />
      )}
      <LoadingIndicator isLoading={products?.length === 0} />
    </div>
  );
};
