//import {  } from '@services';
import { updateProductData } from '@src/services';
import { FormikHelpers, FormikValues } from 'formik';

export const handleSubmit = async (
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
    console.log(res);
  } catch (error) {
    console.log('Error al actualizar datos del producto !', error);
  } finally {
    formikHelpers.resetForm();
  }
};
