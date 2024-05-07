import { createProducts } from '@src/services';
import { Product } from '@src/types';
import { FormikHelpers } from 'formik';

interface InitialValues {
  name: string;
  primary_image: string;
  price: number;
  description: string;
  details: {
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
      details: values.details,
      stock: values.stock,
      name: values.name,
      price: values.price,
    };
    await createProducts(product);
  } catch (error) {
    console.log('Error al crear prodcuto --> ', error);
  }
};
export default handleSubmit;
