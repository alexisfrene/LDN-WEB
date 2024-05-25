export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  className?: string;
}

export interface ModalWhiteProps {
  children: ReactNode;
  setModal: () => void;
  label: string;
  isOpen: boolean;
}
export interface ModalDeleteProps {
  hideDeleteModal: () => void;
  handleDeleteProduct: () => void;
  text?: string;
}

export interface CategoryIds {
  category_id: string;
  category_value_id: string;
}
export interface ModalCategoryProps {
  onRequestClose: () => void;
  handleChange: (value: CategoryIds) => void;
  values: CategoryIds;
}
