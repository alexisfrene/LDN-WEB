import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Dialog,
  DialogContent,
} from '@components';
import { Category, Size } from '@src/types';
import { getAllCategories, getAllSizes } from '@src/services';
import {
  ModalCategoryProps,
  ModalDeleteProps,
  ModalProps,
  ModalWhiteProps,
} from './modal';

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

export const ModalDelete: React.FC<ModalDeleteProps> = ({
  hideDeleteModal,
  handleDeleteProduct,
  text = '¿Estás seguro de eliminar este producto?',
}) => {
  return (
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
  );
};

export const ModalCategory: React.FC<ModalCategoryProps> = ({
  onRequestClose,
  handleChange,
  values,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState(values);
  const getCategories = async () => {
    const res = await getAllCategories();
    if (res) setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories.map((category) => {
        return (
          <>
            <CardTitle className="my-3">{category.title}</CardTitle>
            <CardContent className="grid grid-cols-3 gap-3">
              {category.values.map(({ value, id }) => {
                return (
                  <Button
                    variant="link"
                    className={`col-span-1 ${
                      selected.category_id === category.category_id &&
                      selected.category_value_id === id
                        ? 'bg-amber-300'
                        : 'bg-slate-200'
                    }`}
                    onClick={() =>
                      setSelected({
                        category_id: category.category_id,
                        category_value_id: id,
                      })
                    }
                  >
                    <p className="text-xs">{value}</p>
                  </Button>
                );
              })}
            </CardContent>
          </>
        );
      })}
      <div className="flex justify-center gap-5">
        <Button onClick={() => handleChange(selected)}>Aceptar</Button>
        <Button variant="destructive" onClick={onRequestClose}>
          Cancelar
        </Button>
      </div>
    </>
  );
};

interface SizeIds {
  size_id: string;
  size_value_id: string;
}
interface ModalSizeProps {
  onRequestClose: () => void;
  values: SizeIds;
  handleChange: (value: SizeIds) => void;
}

export const ModalSize: React.FC<ModalSizeProps> = ({
  onRequestClose,
  handleChange,
  values,
}) => {
  const [size, setSize] = useState<Size[]>([]);
  const [selected, setSelected] = useState(values);
  const getAllSize = async () => {
    const res = await getAllSizes();
    if (res) return setSize(res);
  };
  useEffect(() => {
    getAllSize();
  }, []);

  return (
    <div>
      {size.map((item) => (
        <Card>
          <CardTitle>{item.title}</CardTitle>
          <CardContent>
            {item.values.map(({ value, id }) => (
              <Button
                variant="link"
                onClick={() =>
                  setSelected({ size_id: item.size_id, size_value_id: id })
                }
                className={`col-span-1 ${
                  selected.size_id === item.size_id &&
                  selected.size_value_id === id
                    ? 'bg-amber-300'
                    : 'bg-slate-200'
                }`}
              >
                {value}
              </Button>
            ))}
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-center gap-5">
        <Button onClick={() => handleChange(selected)}>Aceptar</Button>
        <Button variant="destructive" onClick={onRequestClose}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};
