import { FormikHelpers, FormikValues } from 'formik';
import { toast } from 'sonner';
import { StyleDataProps } from '.';
import { updateProductDetails } from '@src/services';

export const handleSubmit = (refresh: (data: StyleDataProps) => void) => {
  return async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => {
    try {
      const data = {
        age: values?.age || '',
        brand: values?.brand || '',
        color: values?.color || '',
        gender: values?.gender || '',
        style: values?.style || '',
      };
      const res = await updateProductDetails(data, values.product_id);

      refresh({
        age: res.age,
        brand: res.brand,
        color: res.color,
        gender: res.gender,
        product_id: res.product_id,
        style: res.style,
      });
      setTimeout(() => toast('Datos actualizados con éxito!'), 200);
    } catch (error) {
      console.log('Error al actualizar datos del producto !', error);
    } finally {
      formikHelpers.resetForm();
    }
  };
};
