import { useForm } from './useForm';
import { handleSubmit } from './handleSubmit';
import { ProductDataTable } from '@components';
import { Product } from '@src/types';

interface DataOfProductsProps {
  product: Product;
}

export const ProductData: React.FC<DataOfProductsProps> = ({ product }) => {
  const dataVist = [
    {
      label: 'Nombre :',
      value: product.name,
      name: 'name',
    },
    {
      label: 'Precio:',
      value: `$ ${product.price}`,
      name: 'price',
    },
    {
      label: 'Descripción:',
      value: product.description,
      name: 'description',
    },
    {
      label: 'Categoría:',
      value: product.category,
      name: 'category',
    },
    { label: 'Numero/Talle:', value: product.size, name: 'size' },
  ];

  const initialValues = useForm(product.product_id!);

  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      title="Información básica"
    />
  );
};
