import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { Button } from '@/components';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

interface ModalWhiteProps {
  children: ReactNode;
  setModal: () => void;
  label: string;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export const ModalWhite: React.FC<ModalWhiteProps> = ({
  children,
  setModal,
  label,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => setModal()}>
      <div className="bg-white grid grid-cols-12 p-3 gap-2">
        <h3 className="col-span-12 mb-3 text-xl font-semibold">{label}</h3>
        {children}
        <div className="col-span-12 mt-3 font-medium flex justify-evenly">
          <Button onClick={() => setModal()} variant="default">
            Aceptar
          </Button>

          <Button onClick={() => setModal()} variant="destructive">
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface ModalDeleteProps {
  isDeleteModalOpen: boolean;
  hideDeleteModal: () => void;
  handleDeleteProduct: () => void;
  text?: string;
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({
  isDeleteModalOpen,
  hideDeleteModal,
  handleDeleteProduct,
  text = '¿Estás seguro de eliminar este producto?',
}) => {
  return (
    <Modal isOpen={isDeleteModalOpen} onRequestClose={hideDeleteModal}>
      <div className="bg-white rounded-sm shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">{text}</h3>
        <div className="flex justify-around">
          <Button variant="destructive" onClick={handleDeleteProduct}>
            Aceptar
          </Button>
          <Button
            className="bg-gray-300 hover:bg-gray-350"
            onClick={hideDeleteModal}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
