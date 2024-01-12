import React, { useState } from 'react';
import { ProductsBySupabase } from '../../../../types';
import {
  getProductsBySupabase,
  handleFilterSubmit,
  removeProductsBySupabase,
} from '../../../../services';
import { NavFilters } from './NavFilters';
import { ProductCard } from './ProductCard';
import {
  LoadingIndicator,
  ModalCategory,
  PaginationBar,
  ScrollArea,
  ModalSize,
  ModalDelete,
} from '../../../../components';
import { useAsync, useFetchAndLoad, useModal } from '../../../../hooks';
import { ModalDetails } from './ModalDetails';
interface Filters {
  category: string;
  size: string;
}
export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductsBySupabase[] | null>([]);
  const [removeId, setRemoveId] = useState<string>('');
  const [pagination, setPagination] = useState<ProductsBySupabase[] | null>([]);
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
    const res = await removeProductsBySupabase(removeId);
    console.log(res);
    if (res) {
      await handleFilterSubmit(filter, setProducts);
      return hideDeleteModal();
    }
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
  useAsync(getProducs, (data) => setProducts(data.slice(0, 23)));

  return (
    <div className="mx-3">
      <LoadingIndicator isLoading={products?.length === 0} />
      <NavFilters
        onCategoryClick={showCategoryModal}
        onSizeClick={showSizeModal}
        onFilterSubmit={() => handleFilterSubmit(filter, setProducts)}
        filter={filter}
        setFilter={setFilter}
        orderByPrice={sortProductsByPrice}
      />
      <ScrollArea className="h-[71vh] col-span-full mt-3">
        <div className="grid gap-5 grid-cols-12 mx-3">
          {pagination?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleClick={() => {
                showDetailsModal();
                setProductSelected(product);
              }}
              handleClose={() => {
                if (product.id) setRemoveId(product.id);
                showDeleteModal();
              }}
            />
          ))}
        </div>
      </ScrollArea>
      {products && <PaginationBar data={products} setState={setPagination} />}
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
        handleDeleteProduct={handleRemoveProduct}
        hideDeleteModal={hideDeleteModal}
      />
      {productSelected && (
        <ModalDetails
          productSelected={productSelected}
          isDetailsModalOpen={isDetailsModalOpen}
          handleCloseModal={hideDetailsModal}
        />
      )}
    </div>
  );
};
