import { useState, useEffect } from "react";
import { CategoryFilterModal } from "./CategoryFilterModalProps";
import { SizeFilterModal } from "./SizeFilterModal";
import { FilterControls } from "./FilterControls";
import { ProductCard } from "./ProductCard";
import { ProductsBySupabase } from "../../../types";
import { productsSize } from "../../../mocks";
import { getProductsBySupabase, handleFilterSubmit } from "../../../services";
import { LoadingIndicator } from "../../../components";
import { Modal } from "../../../components";

interface Filters {
  category: string | boolean;
  size: string | boolean;
}

export const LoadedProducts = () => {
  const [products, setProducts] = useState<ProductsBySupabase[] | null>([]);
  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const [modalSize, setModalSize] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filters>({
    category: false,
    size: false,
  });
  const sizes = productsSize();
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
        return <ProductCard product={product} key={product.id} />;
      })}
      <LoadingIndicator isLoading={!!products} />
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
    </div>
  );
};
