import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Modal,
  Label,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@components';
import { useModal } from '@hooks';
import { Rows } from './Rows';

export const Config: React.FC = () => {
  const { hideModal, isOpenModal, modalContent, showModal, modalTitle } =
    useModal();
  const {
    hideModal: hideSheet,
    isOpenModal: isOpenSheet,
    modalContent: sheetContent,
    modalTitle: sheetTitle,
    showModal: showSheet,
  } = useModal();

  return (
    <Card className="h-full">
      <CardHeader>Configuración</CardHeader>
      <CardContent>
        <Rows hideModal={hideModal} showModal={showModal} showSheet={showSheet} />
      </CardContent>
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
