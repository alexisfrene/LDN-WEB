import React from 'react';
import { ProductDetail } from '../ProductDetail';
import { ModalDelete } from '@components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeProduct } from '@services';
import { ProductCard } from '../ProductCard';
import { toast } from 'sonner';

interface Props {
  data: Product[];
  showModal: (title: string, content: React.ReactElement) => void;
  hideModal: () => void;
}

export const ProductsGrid: React.FC<Props> = ({
  data,
  showModal,
  hideModal,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
  return (
    <div className="grid gap-3 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {data.map((product, index) => {
        return (
          <ProductCard
            key={index}
            handleClick={() => {
              showModal('', <ProductDetail product_id={product.product_id!} />);
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
  );
};
