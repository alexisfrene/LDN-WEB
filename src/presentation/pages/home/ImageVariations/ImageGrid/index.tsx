import { LoadingIndicator, Modal } from '@src/presentation/components';
import { getAllVariations } from '@src/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CardImageVariations } from './CardImageVariations';
import { ModalGallery } from './ModalGallery';
import { useModal } from '@src/presentation/hooks';

export const ImageGrid: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () => getAllVariations(),
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="grid grid-cols-3">
      {data.map((variation: Variants) => (
        <CardImageVariations
          onCLickImage={() => {
            showModal('', <ModalGallery variationSelected={variation} />);
          }}
          onClick={() => {}}
          variation={variation}
          key={variation.variation_id}
        />
      ))}
      <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
        <div>{modalTitle}</div>
        {modalContent}
      </Modal>
    </div>
  );
};
