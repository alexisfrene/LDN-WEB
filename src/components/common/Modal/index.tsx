import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { PrimaryButton } from '..';

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
          <PrimaryButton
            onClick={() => setModal()}
            label="Aceptar"
            additionalClasses="bg-green-400 hover:bg-green-500"
          />
          <PrimaryButton
            onClick={() => setModal()}
            label="Cancelar"
            additionalClasses="bg-red-500 hover:bg-red-600"
          />
        </div>
      </div>
    </Modal>
  );
};
