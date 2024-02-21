import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Separator,
  Modal,
  Label,
  Icons,
} from '@/components';
import { useModal } from '@/hooks';
import React from 'react';
import { CategoryEdit } from './CategoryEdit';

export const Config: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const config = [
    {
      description: 'Editar las categorías de los productos',
      icon: (
        <Icons
          type="copy_manual"
          className="text-slate-500 w-6 col-span-1 hover:text-slate-700 cursor-pointer"
        />
      ),
      onClick: () => showModal('Editando categorías', <CategoryEdit />),
    },
    {
      description: 'Editar logo',
      icon: (
        <Icons
          type="copy_manual"
          className="text-slate-500 w-6 col-span-1 hover:text-slate-700 cursor-pointer"
        />
      ),
      onClick: () => showModal('Logo actual', <div>Hola</div>),
    },
  ];
  const renderRows = () => {
    return config.map((row, i) => (
      <div className="hover:bg-slate-100 px-1" key={i}>
        <Separator />
        <CardDescription className="flex justify-between my-3 select-none">
          {row.description}
          <span onClick={row.onClick} className="cursor-pointer">
            {row.icon}
          </span>
        </CardDescription>
        <Separator />
      </div>
    ));
  };

  return (
    <Card className="h-full">
      <CardHeader>Configuración</CardHeader>
      <CardContent>{renderRows()}</CardContent>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={hideModal}
        className="max-w-fit"
      >
        <Label>{modalTitle}</Label>
        {modalContent}
      </Modal>
    </Card>
  );
};
