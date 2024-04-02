import React, { useState } from 'react';
import { Filters, ProductsBySupabase } from '../../../../types';
import {
  getProductsBySupabase,
  handleFilterSubmit,
  removeProductsBySupabase,
} from '../../../../services';
import { NavFilters } from './NavFilters';
import { ProductCard } from './ProductCard';
import {
  ModalCategory,
  PaginationBar,
  ScrollArea,
  ModalSize,
  ModalDelete,
} from '../../../../components';
import { useAsync, useFetchAndLoad, useModal } from '../../../../hooks';
import { ModalDetails } from './ModalDetails';

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

  const refresh = async () => await handleFilterSubmit(filter, setProducts);

  return (
    <div className="mx-3">
      <NavFilters
        onCategoryClick={showCategoryModal}
        onSizeClick={showSizeModal}
        onFilterSubmit={() => handleFilterSubmit(filter, setProducts)}
        filter={filter}
        setFilter={setFilter}
        orderByPrice={sortProductsByPrice}
      />
      <ScrollArea className="lg:h-[69vh] xl:h-[70vh] 2xl:h-[72vh] col-span-full my-2">
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {products?.length ? (
            pagination?.map((product) => (
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
            ))
          ) : (
            <p className="col-span-full">No hay productos que mostrar !</p>
          )}
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
          handleCloseModal={() => {
            hideDetailsModal();
            refresh();
          }}
        />
      )}
    </div>
  );
};
