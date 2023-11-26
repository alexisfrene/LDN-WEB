import { useState, useEffect } from "react";
import { CategoryFilterModal } from "./CategoryFilterModalProps";
import { SizeFilterModal } from "./SizeFilterModal";
import { FilterControls } from "./FilterControls";
import { ProductCard } from "./ProductCard";
import { ProductsBySupabase } from "../../../types";
import { productsSize } from "../../../mocks";
import {
  getProductsBySupabase,
  handleFilterSubmit,
  removeProductsBySupabase,
} from "../../../services";
import { LoadingIndicator, Modal } from "../../../components";
import { ProductsDetailsModal } from "./ProductsDetailsModal";

interface Filters {
  category: string | boolean;
  size: string | boolean;
}

export const LoadedProducts = () => {
  const [products, setProducts] = useState<ProductsBySupabase[] | null>([]);
  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const [modalSize, setModalSize] = useState<boolean>(false);
  const [modalRemove, setModalRemove] = useState<boolean>(false);
  const [removeId, setModalRemovEId] = useState<string>("");
  const [modalDetailProduct, setModalDetailProduct] = useState<boolean>(false);
  const [productSelected, setProductSelected] =
    useState<ProductsBySupabase | null>(null);
  const [filter, setFilter] = useState<Filters>({
    category: false,
    size: false,
  });
  const sizes = productsSize();

  const removeProduct = async () => {
    await removeProductsBySupabase(removeId);
    setModalRemove(false);
    await handleFilterSubmit(filter, setProducts);
  };

  const reloadProducts = () => {
    handleFilterSubmit(filter, setProducts);
    setModalDetailProduct(false);
  };
  useEffect(() => {
    getProductsBySupabase(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-3 mx-5">
      <FilterControls
        onCategoryClick={setModalCategory}
        onSizeClick={setModalSize}
        onFilterSubmit={() => handleFilterSubmit(filter, setProducts)}
        filter={filter}
        setFilter={setFilter}
      />
      {products?.map((product) => {
        return (
          <ProductCard
            product={product}
            key={product.id}
            handleClick={() => {
              setModalDetailProduct(true);
              setProductSelected(product);
            }}
            handleClose={() => {
              setModalRemovEId(product.id);
              setModalRemove(true);
            }}
          />
        );
      })}
      <LoadingIndicator isLoading={products?.length === 0} />
      <Modal
        isOpen={modalCategory}
        onRequestClose={() => setModalCategory(false)}
      >
        <CategoryFilterModal
          setModalCategory={setModalCategory}
          filter={filter}
          setFilter={setFilter}
        />
      </Modal>
      <Modal isOpen={modalSize} onRequestClose={() => setModalSize(false)}>
        <SizeFilterModal
          sizes={sizes}
          setFilter={setFilter}
          filter={filter}
          setModalSize={setModalSize}
        />
      </Modal>
      <Modal
        isOpen={modalDetailProduct}
        onRequestClose={() => setModalDetailProduct(false)}
      >
        {productSelected && (
          <ProductsDetailsModal
            productSelected={productSelected}
            reloadProducts={reloadProducts}
          />
        )}
      </Modal>
      <Modal isOpen={modalRemove} onRequestClose={() => setModalRemove(false)}>
        <div className="bg-white rounded-sm shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            ¿Estás seguro de eliminar este producto?
          </h3>
          <div className="flex justify-around">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={removeProduct}
            >
              Aceptar
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => setModalRemove(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
