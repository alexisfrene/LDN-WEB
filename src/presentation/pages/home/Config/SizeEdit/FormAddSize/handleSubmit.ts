import { toast } from 'sonner';
import { addSizeCollection, addValueSize } from '@services';
import { FormikHelpers } from 'formik';

interface ValuesProps {
  title: string;
  values: { value: string }[];
}

export const handleSubmitAdd = async (
  values: ValuesProps,
  formikHelpers: FormikHelpers<ValuesProps>,
) => {
  const res = await addSizeCollection(values);

  console.log(res);
  if (res) {
    toast('Numero / Talla  creada exitosamente !');
  }
  setTimeout(() => {
    formikHelpers.resetForm();
  }, 500);
};

export const handleSubmitAddValues = async (
  values: { value: string },
  category_id: string,
) => {
  await addValueSize(values.value, category_id);

  toast('Valores creados exitosamente !');
};
