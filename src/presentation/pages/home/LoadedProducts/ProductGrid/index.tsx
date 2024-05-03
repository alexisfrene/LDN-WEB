import React, { useEffect, useState } from 'react';
import { Filters, Products } from '@src/types';
import {
  getAllProducts,
  handleFilterSubmit,
  removeProductsBySupabase,
} from '@services';
import { NavFilters } from './NavFilters';
import { ProductCard } from './ProductCard';
import {
  ModalCategory,
  PaginationBar,
  ScrollArea,
  ModalSize,
  ModalDelete,
  Button,
} from '@components';
import { useModal } from '@presentation/hooks';
import { ModalDetails } from './ModalDetails';

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Products[] | null>([]);
  const [removeId, setRemoveId] = useState<string>('');
  const [pagination, setPagination] = useState<Products[] | null>([]);
  const [productSelected, setProductSelected] = useState<Products | null>(null);
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
  } = useModal(); //TODO: acomodar esto no debe haber tantos useModal

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
          ? sortedProducts.sort((a, b) => b.price - a.price)
          : sortedProducts.sort((a, b) => a.price - b.price),
      );
    }
  };
  const handleFilterClick = (selectedFilter: string, filterType: string) => {
    setFilter({
      ...filter,
      [filterType]: selectedFilter,
    });
  };

  const refresh = async () => await handleFilterSubmit(filter, setProducts);

  useEffect(() => {
    const axiosProducts = async () => {
      const response = await getAllProducts();
      setProducts(response);
    };
    axiosProducts();
  }, []);

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
      <Button title="Refresh" onClick={refresh} />
      <ScrollArea className="lg:h-[69vh] xl:h-[70vh] 2xl:h-[72vh] col-span-full my-2">
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {products?.length ? (
            pagination?.map((product) => (
              <ProductCard
                product={product}
                key={product.id_product}
                handleClick={() => {
                  showDetailsModal();
                  setProductSelected(product);
                }}
                handleClose={() => {
                  if (product.user_id) setRemoveId(product.user_id);
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
      {/* {productSelected && (
        <ModalDetails
          productSelected={productSelected}
          isDetailsModalOpen={isDetailsModalOpen}
          handleCloseModal={() => {
            hideDetailsModal();
            refresh();
          }}
        />
      )} */}
    </div>
  );
};
