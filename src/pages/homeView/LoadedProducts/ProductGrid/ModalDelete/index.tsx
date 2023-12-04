import React from 'react';
import { Modal } from '../../../../../components';

interface ModalDeleteProps {
  isDeleteModalOpen: boolean;
  handleRemoveProduct: () => void;
  handleCloseModal: () => void;
}
export const ModalDelete: React.FC<ModalDeleteProps> = ({
  isDeleteModalOpen,
  handleRemoveProduct,
  handleCloseModal,
}) => {
  return (
    <Modal isOpen={isDeleteModalOpen} onRequestClose={handleCloseModal}>
      <div className="bg-white rounded-sm shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          ¿Estás seguro de eliminar este producto?
        </h3>
        <div className="flex justify-around">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleRemoveProduct}
          >
            Aceptar
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};
