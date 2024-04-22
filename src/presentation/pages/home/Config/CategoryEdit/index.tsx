import React, { useEffect, useState } from 'react';
import {
  Button,
  Icons,
  LoadingIndicator,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@components';
import { useModal } from '@presentation/hooks';
import { getCategoryConfig } from '@src/services';
import { EditForm } from './EditForm';
import { producsCategory } from '@presentation/mocks';
import {
  handleSubmitAdd,
  handleSubmitEdit,
  handleSubmitRemove,
} from './handleSubmit';
import { CategoryConfigItem } from '@src/types';

export const CategoryEdit: React.FC = () => {
  const [category, setCategory] = useState<CategoryConfigItem[] | []>([]);
  const getCategory = async () => {
    const res = await getCategoryConfig();
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
        <div className="flex justify-between flex-col gap-3">
          {category.map((e, i) => {
            const categoryObject = producsCategory.find(
              (category) => category.type === e.icon,
            );
            return (
              <div
                className="hover:bg-slate-100 border-b flex justify-between mx-3"
                key={i}
              >
                <div className="flex gap-3">
                  {categoryObject && (
                    <img
                      className="w-6"
                      src={categoryObject.icon}
                      alt={e.name}
                    />
                  )}
                  {e.name}
                </div>
                <div className="flex gap-3">
                  <Icons
                    type="cog_6_tooth"
                    className="w-6 text-slate-300 hover:text-slate-500 cursor-pointer"
                    onClick={() =>
                      showModal(
                        `Editar categoría : ${e.name}`,
                        <EditForm
                          category={e}
                          handleSubmit={(values: CategoryConfigItem) => {
                            handleSubmitEdit(values, () => {
                              hideModal();
                              getCategory();
                            });
                          }}
                        />,
                      )
                    }
                  />
                  <Icons
                    type="close"
                    className="w-6 bg-red-500 rounded-sm text-slate-100 hover:bg-red-600 cursor-pointer"
                    onClick={() =>
                      handleSubmitRemove(e.id, () => {
                        hideModal();
                        getCategory();
                      })
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
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
