import React, { useState } from "react";
import { ImageVariantsProduct } from "../../types";
import { deleteProductById } from "../../services";
import { Modal } from "..";

export const ProductGrid: React.FC<{
  products: ImageVariantsProduct[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<ImageVariantsProduct[]>>;
}> = ({ products, setProducts }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [productSelected, setProductSelected] =
    useState<ImageVariantsProduct | null>(null);
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      setProducts((prevProducts) =>
        prevProducts?.filter((product) => product.id !== id)
      );
      setModalDeleteIsOpen(false);
    } catch (error) {
      console.error("Error al eliminar un producto por id");
    }
  };
  const handlerGalleryImage = (product: ImageVariantsProduct) => {
    setProductSelected(product);
    setModalIsOpen(true);
  };

  return (
    <div className="grid gap-5 grid-cols-4">
      {products?.map((product) => (
        <span
          className="group bg-gradient-to-t from-amber-600 via-amber-100 to-orange-400 cursor-pointer rounded-xl "
          key={product.id}
        >
          <div className="rounded-xl border-4 col-span-1 group-hover:border-amber-600 shadow-sm hover:shadow-xl relative transition-all duration-300 ">
            <button
              className="bg-white h-9 w-9 absolute top-0 right-0 transition-all duration-300"
              onClick={() => {
                setSelectedId(product.id);
                setModalDeleteIsOpen(true);
              }}
            >
              X
            </button>
            <h3 className="text-lg bg-amber-600 truncate h-9 flex items-center justify-center transition-all duration-300 rounded-t33-xl">
              {product.description}
            </h3>

            <div className="flex flex-col items-center">
              <h4 className="text-base transition-all duration-300">
                {product.category}
              </h4>
              <img
                src={`http://localhost:3001/${product.miniature_image}`}
                alt={product.description}
                className="self-center rounded-t-lg w-96 object-cover border-x-4 border-t-4 transition-all duration-300 group-hover:border-amber-600 h-96"
                onClick={() => handlerGalleryImage(product)}
              />
            </div>
          </div>
        </span>
      ))}

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="bg-amber-600 flex flex-col rounded shadow-lg overflow-y-auto">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-0 right-0 bg-white hover:bg-slate-200 font-bold h-9 w-9 transition-all duration-300"
          >
            X
          </button>
          <h2 className="text-2xl mb-4 text-center bg-amber-700 text-white rounded transition-all duration-300 h-9">
            {productSelected?.description?.toUpperCase()}
          </h2>

          {productSelected?.variations?.map((variation, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 mb-4 transition-all duration-300 px-5"
            >
              <h3 className="col-span-12 text-lg font-bold text-white transition-all duration-300">
                {variation.name}
              </h3>
              {variation.images.map((image: string, imageIndex: number) => (
                <img
                  key={imageIndex}
                  src={`http://localhost:3001/${image}`}
                  alt={`Image ${imageIndex + 1}`}
                  className="object-contain col-span-4 w-56 h-56 rounded-md transition-all duration-300 bg-amber-500"
                />
              ))}
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        isOpen={modalDeleteIsOpen}
        onRequestClose={() => setModalDeleteIsOpen(false)}
      >
        <div className="bg-white rounded-sm shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            ¿Estás seguro de eliminar este producto?
          </h3>
          <div className="flex justify-around">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => handleDeleteProduct(selectedId)}
            >
              Aceptar
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => setModalDeleteIsOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
