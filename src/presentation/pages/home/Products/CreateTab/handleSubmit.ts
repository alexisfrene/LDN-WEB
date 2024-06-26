import { FormikHelpers } from 'formik';
import { toast } from 'sonner';
import { createProducts } from '@src/services';

interface InitialValues {
  name: string;
  images: ImagesValues[];
  price: number;
  description: string;
  detail: {
    age: string;
    brand: string;
    color: string;
    gender: string;
    style: string;
  };
  stock: number;
  category: {
    category_id: string;
    category_value_id: string;
  };
  size: {
    size_id: string;
    size_value_id: string;
  };
}

const handleSubmit = async (
  values: InitialValues,
  formikHelpers: FormikHelpers<InitialValues>,
) => {
  try {
    const product: Product = {
      size_value: values.size.size_value_id,
      size_id: values.size.size_id,
      category_id: values.category.category_id,
      category_value: values.category.category_value_id,
      description: values.description,
      detail: values.detail,
      stock: values.stock,
      name: values.name,
      price: values.price,
      primary_image: values.images[0].file,
    };

    const res = await createProducts(product);
    if (res) {
      formikHelpers.resetForm();
      toast('Producto creado con éxito !');
    }
  } catch (error) {
    console.error('Error al crear producto --> ', error);
  }
};
export default handleSubmit;
