import React, { useEffect, useState } from 'react';
import { Products } from '@src/types';
import { getAllProducts } from '@src/services';
import { ProductCard } from './ProductCard';
import { Modal, ScrollArea } from '@components';
import { useModal } from '@hooks';
import { ModalDetails } from './ModalDetails';

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const getProducts = async () => {
    const res = await getAllProducts();
    if (res) {
      setProducts(res);
    }
  };

  useEffect(() => {
    getProducts();
  }, [products, setProducts]);

  return (
    <div className="mx-3">
      <ScrollArea className="lg:h-[69vh] xl:h-[68vh] 2xl:h-[72vh] col-span-full">
        <div className="grid gap-3 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {products.map((product) => {
            return (
              <ProductCard
                handleClick={() => {
                  showModal('detalles', <ModalDetails product={product} />);
                }}
                handleClose={() => {}}
                product={product}
              />
            );
          })}
        </div>
      </ScrollArea>
      <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
        {modalContent}
      </Modal>
    </div>
  );
};
