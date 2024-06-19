import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Separator,
  Modal,
  Label,
  Icons,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@components';
import { useModal } from '@presentation/hooks';
import { CategoryEdit } from './CategoryEdit';
import { SizeEdit } from './SizeEdit';
import { SignOff } from './SignOff';
import { useSessionStore } from '@src/presentation/global';

export const Config: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const avatar = useSessionStore((state) => state.avatar);
  const {
    hideModal: hideSheet,
    isOpenModal: isOpenSheet,
    modalContent: sheetContent,
    modalTitle: sheetTitle,
    showModal: showSheet,
  } = useModal();

  const config = [
    {
      description: 'Ajustes en categorías',
      icon: (
        <Icons
          type="copy_manual"
          className="col-span-1 w-6 cursor-pointer text-slate-500 hover:text-slate-700"
        />
      ),
      onClick: () =>
        showModal(
          'Editando categorías',
          <CategoryEdit showSheet={showSheet} />,
        ),
    },
    {
      description: 'Ajustes en talles/números',
      icon: (
        <Icons
          type="copy_manual"
          className="col-span-1 w-6 cursor-pointer text-slate-500 hover:text-slate-700"
        />
      ),
      onClick: () =>
        showModal('Editar talles/números', <SizeEdit showSheet={showSheet} />),
    },
    {
      description: 'Editar logo',
      icon: (
        <Icons
          type="copy_manual"
          className="col-span-1 w-6 cursor-pointer text-slate-500 hover:text-slate-700"
        />
      ),
      onClick: () =>
        showModal(
          'Logo actual',
          <div>
            <img src={avatar} />
          </div>,
        ),
    },
    {
      description: 'Cerrar sesión',
      icon: (
        <Icons
          type="arrow_left_start_on_rectangle"
          className="col-span-1 w-6 cursor-pointer text-red-500 hover:text-red-600"
        />
      ),
      onClick: () =>
        showModal(
          'Estas seguro de cerrar sesión ?',
          <SignOff hideModal={hideModal} />,
        ),
    },
  ];
  const renderRows = () => {
    return config.map((row, i) => (
      <div className="px-1 hover:bg-slate-100" key={i}>
        <Separator />
        <CardDescription className="my-3 flex select-none justify-between">
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
      <Sheet open={isOpenSheet} onOpenChange={hideSheet}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{sheetTitle}</SheetTitle>
          </SheetHeader>
          {sheetContent}
        </SheetContent>
      </Sheet>
    </Card>
  );
};
