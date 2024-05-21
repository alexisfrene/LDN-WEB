import { updateProductDetails } from '@src/services';
import { FormikHelpers, FormikValues } from 'formik';
import { toast } from 'sonner';

export const handleSubmit = async (
  values: FormikValues,
  formikHelpers: FormikHelpers<FormikValues>,
) => {
  try {
    const res = await updateProductDetails(values, values.product_id);
    if (res) {
      formikHelpers.resetForm();
      toast('Propiedad editada con éxito !');
    }
  } catch (error) {
    console.log('Error al editar los detalles del producto ', error);
  }
};
