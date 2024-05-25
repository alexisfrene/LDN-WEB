import React, { useEffect, useState } from 'react';
import {
  Button,
  LoadingIndicator,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@components';
import { useModal } from '@presentation/hooks';

import { EditForm } from './EditForm';
import { handleSubmitAdd } from './handleSubmit';
import { CategoryConfigItem } from '@src/types';
import { getAllCategories } from '@src/services';

export const CategoryEdit: React.FC = () => {
  const [category, setCategory] = useState<CategoryConfigItem[] | []>([]);
  const getCategory = async () => {
    const res = await getAllCategories();
    if (Array.isArray(res)) return setCategory(res);
  };
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="min-w-[70vw] flex flex-col">
      <ScrollArea className="h-[75vh] min-w-[70vw]">
        <div className="flex justify-between flex-col gap-3"></div>
      </ScrollArea>
      <Button
        className="bg-green-400 hover:bg-green-500"
        onClick={() =>
          showModal(
            'Crear nueva categoría :',
            <EditForm
              handleSubmit={(values: CategoryConfigItem) => {
                handleSubmitAdd(values, () => {
                  hideModal();
                  getCategory();
                });
              }}
            />,
          )
        }
      >
        Agregar un nueva categoría
      </Button>
      <Sheet open={isOpenModal} onOpenChange={hideModal}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{modalTitle}</SheetTitle>
          </SheetHeader>
          {modalContent}
        </SheetContent>
      </Sheet>
      <LoadingIndicator isLoading={!category.length} />
    </div>
  );
};
