import { FormikHelpers } from 'formik';
import { createVariation } from '@services';
import { toast } from 'sonner';

export const handleSubmit = async (
  values: initialValues,
  formikHelpers: FormikHelpers<initialValues>,
) => {
  try {
    const data = {
      title: values.title,
      label: values.label,
      category_id: values.category.category_id,
      category_value: values.category.category_value_id,
      files: values.images.map((image: { file: File }) => image.file),
    };
    const res = await createVariation(data);

    if (res) {
      setTimeout(() => {
        toast('Variación creada con éxito!');
        formikHelpers.resetForm();
      }, 500);
    }
  } catch (error) {
    console.log('Error in Create Variation ->', error);
  }
};