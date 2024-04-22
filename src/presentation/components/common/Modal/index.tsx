import React, { ReactNode } from 'react';
import { producsCategory, productsSize } from '@presentation/mocks';
import { filterAndMapTitles } from '@lib';
import { Button, Dialog, DialogContent } from '@components';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  className?: string;
}

interface ModalWhiteProps {
  children: ReactNode;
  setModal: () => void;
  label: string;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  className,
  ...props
}) => {
  return (
    <Dialog
      open={isOpen}
      defaultOpen={false}
      onOpenChange={() => onRequestClose()}
    >
      <DialogContent {...props} className={className}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export const ModalWhite: React.FC<ModalWhiteProps> = ({
  children,
  setModal,
  label,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => setModal()}>
      <div className="bg-white grid grid-cols-12 p-3 gap-2">
        <h3 className="col-span-full mb-3 text-xl font-semibold">{label}</h3>
        {children}
        <div className="col-span-full mt-3 font-medium flex justify-evenly">
          <Button onClick={() => setModal()} variant="default">
            Aceptar
          </Button>
          <Button onClick={() => setModal()} variant="destructive">
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface ModalDeleteProps {
  isDeleteModalOpen: boolean;
  hideDeleteModal: () => void;
  handleDeleteProduct: () => void;
  text?: string;
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({
  isDeleteModalOpen,
  hideDeleteModal,
  handleDeleteProduct,
  text = '¿Estás seguro de eliminar este producto?',
}) => {
  return (
    <Modal isOpen={isDeleteModalOpen} onRequestClose={hideDeleteModal}>
      <div className="rounded-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">{text}</h3>
        <div className="flex justify-evenly">
          <Button variant="destructive" onClick={handleDeleteProduct}>
            Aceptar
          </Button>
          <Button
            className="bg-gray-300 hover:bg-gray-350"
            onClick={hideDeleteModal}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface ModalCategoryProps {
  isCategoryModalOpen: boolean;
  handleFilterClick: (type: string, value: string) => void;
  handleCloseModal: () => void;
  filter: { category: string };
}

export const ModalCategory: React.FC<ModalCategoryProps> = ({
  isCategoryModalOpen,
  handleFilterClick,
  handleCloseModal,
  filter,
}) => {
  return (
    <ModalWhite
      setModal={handleCloseModal}
      label="Selecciona una categoría para filtrar:"
      isOpen={isCategoryModalOpen}
    >
      {producsCategory.map((category) => (
        <div
          key={category.type}
          className={`${
            filter.category === category.type ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 cursor-pointer hover:bg-slate-400 col-span-4`}
          onClick={() => handleFilterClick(category.type, 'category')}
        >
          {filterAndMapTitles(category.type)}
        </div>
      ))}
    </ModalWhite>
  );
};

interface ModalSizeProps {
  isSizeModalOpen: boolean;
  handleFilterClick: (type: string, value: string) => void;
  handleCloseModal: () => void;
  filter: { size: string };
}
export const ModalSize: React.FC<ModalSizeProps> = ({
  isSizeModalOpen,
  handleFilterClick,
  handleCloseModal,
  filter,
}) => {
  const sizes = productsSize();
  return (
    <ModalWhite
      setModal={handleCloseModal}
      label="Selecciona un número/talle para filtrar:"
      isOpen={isSizeModalOpen}
    >
      {sizes.number.map((size) => (
        <div
          key={size}
          className={`${
            filter.size === size.toString() ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 col-span-2 cursor-pointer hover:bg-slate-400`}
          onClick={() => handleFilterClick(size.toString(), 'size')}
        >
          {size.toString()}
        </div>
      ))}
      <h3 className="col-span-12 mb-3 text-xl font-semibold">
        Selecciona un talle para filtrar:
      </h3>
      {sizes.letter.map((size) => (
        <div
          key={size}
          className={`${
            filter.size === size.toString() ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 col-span-2 cursor-pointer hover:bg-slate-400`}
          onClick={() => handleFilterClick(size.toString(), 'size')}
        >
          {size.toString()}
        </div>
      ))}
    </ModalWhite>
  );
};
