import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getAllProducts, removeProduct } from '@src/services';
import { ProductCard } from './ProductCard';
import { Modal, ModalDelete, ScrollArea } from '@components';
import { useModal } from '@hooks';
import { ModalDetails } from './ModalDetails';

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const getProducts = async () => {
    const res = await getAllProducts();
    if (res) {
      setProducts(res);
    }
  };
  const handleDeleteProduct = async (id: string) => {
    const res = await removeProduct(id);
    if (res) {
      toast('Producto eliminado con éxito!');
      hideModal();
    } else {
      toast('Ocurrió un error!');
    }
  };

  useEffect(() => {
    getProducts();
  }, [products, setProducts]);

  return (
    <div className="mx-3">
      <ScrollArea className="col-span-full lg:h-[69vh] xl:h-[68vh] 2xl:h-[72vh]">
        <div className="grid gap-3 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {products.map((product, index) => {
            return (
              <ProductCard
                key={index}
                handleClick={() => {
                  showModal('', <ModalDetails product={product} />);
                }}
                removeProduct={() => {
                  showModal(
                    '',
                    <ModalDelete
                      handleDeleteProduct={() => {
                        handleDeleteProduct(product.product_id!);
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
        className="border-none bg-transparent"
      >
        <div>{modalTitle}</div>
        {modalContent}
      </Modal>
    </div>
  );
};
