import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@services';
import {
  LoadingIndicator,
  Modal,
  ScrollArea,
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarCheckboxItem,
  Switch,
} from '@components';
import { useModal } from '@hooks';
import { ProductsGrid } from './ProductsGrid';

export const ProductGrid: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

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
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Vista</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>
              Ver en grilla :
              <Switch
                checked={checked}
                onCheckedChange={setChecked}
                className="mx-1"
              />
            </MenubarCheckboxItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <ScrollArea className="h-[calc(100vh-140px)]">
        {checked ? (
          <ProductsGrid
            data={data}
            hideModal={hideModal}
            showModal={showModal}
          />
        ) : (
          <div>hola</div>
        )}
      </ScrollArea>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={hideModal}
        className="flex max-w-fit justify-center"
      >
        <div>{modalTitle}</div>
        {modalContent}
      </Modal>
    </div>
  );
};
