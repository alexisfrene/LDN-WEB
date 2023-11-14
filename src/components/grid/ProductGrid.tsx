import React, { useState } from "react";
import { Product } from "../../types";
import { deleteProductById } from "../../services";
import ReactModal from "react-modal";

export const ProductGrid: React.FC<{
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}> = ({ products, setProducts }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      setProducts((prevProducts) =>
        prevProducts?.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar un producto por id");
    }
  };
  const handlerGalleryImage = (product: Product) => {
    setProductSelected(product);
    setModalIsOpen(true);
  };

  return (
    <div className="grid gap-5 grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mt-2 mx-1">
      {products?.map((product) => (
        <div key={product.id} className="border-2 px-2 py-1">
          <h3 className="flex justify-between">
            {product.description}
            <button
              className="bg-white h-7 w-7 p-1"
              onClick={() => handleDeleteProduct(product.id)}
            >
              X
            </button>
          </h3>
          <h4>{product.category}</h4>
          <img
            src={`http://localhost:3001/${product.miniatureImage}`}
            alt={product.description}
            className="mb-2 cursor-pointer"
            onClick={() => handlerGalleryImage(product)}
          />
          <h5>{product.id}</h5>
        </div>
      ))}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Color y opacidad del fondo
          },
        }}
      >
        <div className="bg-amber-600 flex justify-center flex-col rounded shadow-lg">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-1 right-1 m-1 bg-white hover:bg-slate-200 font-bold py-2 px-4 rounded"
          >
            X
          </button>
          <h2 className="text-2xl mb-4 text-center bg-amber-700 w-full p-1">
            {productSelected?.description.toLocaleUpperCase()}
          </h2>
          <div className="grid grid-cols-12 gap-2 m-2">
            {productSelected?.variations?.map((variation) => {
              return (
                <img
                  key={productSelected?.description}
                  src={`http://localhost:3001/${variation}`}
                  alt={productSelected?.description}
                  className="object-contain col-span-4"
                />
              );
            })}
          </div>
        </div>
      </ReactModal>
    </div>
  );
};
