import React, { useEffect, useState } from 'react';
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
import { getUrlAvatar } from '@src/services';
import { SizeEdit } from './SizeEdit';

export const Config: React.FC = () => {
  const [avatar, setAvatar] = useState('');
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const {
    hideModal: hideSheet,
    isOpenModal: isOpenSheet,
    modalContent: sheetContent,
    modalTitle: sheetTitle,
    showModal: showSheet,
  } = useModal();
  const getAvatarImage = async () => {
    const res = await getUrlAvatar();
    setAvatar(res);
  };
  const config = [
    {
      description: 'Ajustes en categorías',
      icon: (
        <Icons
          type="copy_manual"
          className="text-slate-500 w-6 col-span-1 hover:text-slate-700 cursor-pointer"
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
          className="text-slate-500 w-6 col-span-1 hover:text-slate-700 cursor-pointer"
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
          className="text-slate-500 w-6 col-span-1 hover:text-slate-700 cursor-pointer"
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
  useEffect(() => {
    getAvatarImage();
  }, []);

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
