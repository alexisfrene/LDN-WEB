import { addCategoryConfig } from '@services';
import { CategoryCreate } from '@src/types';
import { toast } from 'sonner';

// export const handleSubmitEdit = async (
//   values: CategoryConfigItem,
//   hideModal: () => void,
// ) => {
//   const res = await updateCategoryConfig(values);
//   if (res?.ok) {
//     toast('Cambios echos !');
//     hideModal();
//   }
// };

export const handleSubmitAdd = async (
  values: CategoryCreate,
  hideModal: () => void,
) => {
  const res = await addCategoryConfig(values);
  console.log(res);
  if (res) {
    toast('Categoría creada exitosamente !');
    hideModal();
  }
};

// export const handleSubmitRemove = async (id: UUID, hideModal: () => void) => {
//   const res = await deleteCategoryConfig(id);
//   if (res?.ok) {
//     toast('Categoría eliminada exitosamente !');
//     hideModal();
//   }
// };
