import React from "react";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import { Product } from "../../types";
export const ProductsImage: React.FC<{
  selectedProduct: Product | null;
  closeModal: () => void;
}> = ({ selectedProduct, closeModal }) => {
  return (
    <Modal
      isOpen={!!selectedProduct}
      onRequestClose={closeModal}
      contentLabel="Carrusel de Variaciones"
    >
      {selectedProduct && (
        <Carousel>
          {selectedProduct.variations.map(
            (variation: string, index: number) => (
              <div key={index}>
                <img
                  src={`http://localhost:3001/${variation}`}
                  alt={`Variation ${index}`}
                  className="mb-2 cursor-pointer w-44"
                />
              </div>
            )
          )}
        </Carousel>
      )}
      <button onClick={closeModal}>Cerrar</button>
    </Modal>
  );
};
