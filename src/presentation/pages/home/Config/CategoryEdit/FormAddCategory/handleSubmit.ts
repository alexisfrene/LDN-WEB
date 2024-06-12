import { toast } from 'sonner';
import { addCategoryConfig, addValueCategory } from '@services';

export const handleSubmitAdd = async (values: Category) => {
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
