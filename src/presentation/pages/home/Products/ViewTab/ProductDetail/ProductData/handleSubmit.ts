import { toast } from 'sonner';
import { FormikHelpers, FormikValues } from 'formik';
import { DataOfProductsProps } from '.';
import { updateProductData } from '@src/services';
export const handleSubmit = (refresh: (data: DataOfProductsProps) => void) => {
  return async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => {
    try {
      const data = {
        name: values?.name || '',
        price: values?.price || '',
        description: values?.description || '',
        category_id: values?.category?.category_id || '',
        category_value: values?.category?.category_value_id || '',
        size_id: values?.size?.size_id || '',
        size_value: values?.size?.size_value_id || '',
      };
      const res = await updateProductData(data, values.product_id);

      refresh({
        name: res.name,
        category: res.category,
        description: res.description,
        price: res.price,
        product_id: res.product_id,
        size: res.size,
      });
      setTimeout(() => toast('Datos actualizados con éxito!'), 200);
    } catch (error) {
      console.error('Error al actualizar datos del producto !', error);
    } finally {
      formikHelpers.resetForm();
    }
  };
};
