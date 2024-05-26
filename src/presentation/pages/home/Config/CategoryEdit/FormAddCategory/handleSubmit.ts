import { addCategoryConfig, addValueCategory } from '@services';
import { CategoryCreate } from '@src/types';
import { toast } from 'sonner';

export const handleSubmitAdd = async (values: CategoryCreate) => {
  const res = await addCategoryConfig(values);
  console.log(res);
  if (res) {
    toast('Categoría creada exitosamente !');
  }
};

export const handleSubmitAddValues = async (
  values: any,
  category_id: string,
) => {
  await addValueCategory(values, category_id);

  toast('Valores creados exitosamente !');
};
