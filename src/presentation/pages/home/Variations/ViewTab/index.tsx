import React from 'react';
import { LoadingIndicator, Modal } from '@components';
import { deleteVariationById, getAllVariations } from '@services';
import { useModal } from '@hooks';
import { useQuery } from '@tanstack/react-query';
import { VariationCard } from './VariationCard';
import { VariationDetail } from './VariationDetail';

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
        <VariationCard
          onCLickImage={() => {
            showModal('', <VariationDetail variationSelected={variation} />);
          }}
          handleDelete={async () => {
            await deleteVariationById(variation.variation_id);
          }}
          variation={variation}
          key={variation.variation_id}
        />
      ))}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={hideModal}
        className="max-w-fit"
      >
        <div>{modalTitle}</div>
        {modalContent}
      </Modal>
    </div>
  );
};
