import React from 'react';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllProducts, removeProduct } from '@services';
import { LoadingIndicator, Modal, ModalDelete, ScrollArea } from '@components';
import { useModal } from '@hooks';
import { ProductDetail } from './ProductDetail';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
  const { isPending, error, data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="mx-3">
      <ScrollArea className="lg:h-[69vh] xl:h-[68vh] 2xl:h-[72vh]">
        <div className="grid gap-3 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {data.map((product, index) => {
            return (
              <ProductCard
                key={index}
                handleClick={() => {
                  showModal(
                    '',
                    <ProductDetail product_id={product.product_id!} />,
                  );
                }}
                removeProduct={() => {
                  showModal(
                    '',
                    <ModalDelete
                      handleDeleteProduct={() => {
                        mutation.mutate(product.product_id!);
                        hideModal();
                        toast('Producto eliminado');
                      }}
                      hideDeleteModal={hideModal}
                    />,
                  );
                }}
                product={product}
              />
            );
          })}
        </div>
      </ScrollArea>
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
