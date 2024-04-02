import {
  addCategoryConfig,
  deleteCategoryConfig,
  updateCategoryConfig,
} from '@/services/config';
import { CategoryConfigItem, UUID } from '@/types';
import { toast } from 'sonner';

export const handleSubmitEdit = async (
  values: CategoryConfigItem,
  hideModal: () => void,
) => {
  const res = await updateCategoryConfig(values);
  if (res?.ok) {
    toast('Cambios echos !');
    hideModal();
  }
};

export const handleSubmitAdd = async (
  values: CategoryConfigItem,
  hideModal: () => void,
) => {
  const res = await addCategoryConfig(values);
  if (res?.ok) {
    toast('Categoría creada exitosamente !');
    hideModal();
  }
};

export const handleSubmitRemove = async (id: UUID, hideModal: () => void) => {
  const res = await deleteCategoryConfig(id);
  if (res?.ok) {
    toast('Categoría eliminada exitosamente !');
    hideModal();
  }
};
