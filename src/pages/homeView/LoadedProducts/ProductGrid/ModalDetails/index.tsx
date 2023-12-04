import React from 'react';
import { Modal } from '../../../../../components';
import { ProductsDetailsModal } from '../ProductsDetailsModal';
import { ProductsBySupabase } from '../../../../../types';
interface ModalDetailsProps {
  productSelected: ProductsBySupabase;
  isDetailsModalOpen: boolean;
  handleCloseModal: () => void;
}
export const ModalDetails: React.FC<ModalDetailsProps> = ({
  productSelected,
  isDetailsModalOpen,
  handleCloseModal,
}) => {
  return (
    <Modal isOpen={isDetailsModalOpen} onRequestClose={handleCloseModal}>
      {productSelected && (
        <ProductsDetailsModal
          productSelected={productSelected}
          reloadProducts={() => handleCloseModal()}
        />
      )}
    </Modal>
  );
};
