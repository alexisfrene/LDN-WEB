import { ProductDataTable } from '@components';
import { Product } from '@src/types';
import { handleSubmit } from './handleSubmit';
interface StyleDataProps {
  product: Product;
}

export const StyleData: React.FC<StyleDataProps> = ({ product }) => {
  const dataVist = [
    {
      label: 'Estilo :',
      value: product.details?.style,
      name: 'style',
    },
    {
      label: 'Marca :',
      value: product.details?.brand,
      name: 'brand',
    },
    {
      label: 'Edad :',
      value: product.details?.age,
      name: 'age',
    },
    {
      label: 'Color :',
      value: product.details?.color,
      name: 'color',
    },
    {
      label: 'Genero :',
      value: product.details?.gender,
      name: 'gender',
    },
  ];
  const initialValues = {
    brand: '',
    age: '',
    color: '',
    gender: '',
    styles: '',
    product_id: product.product_id,
  };
  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      title="Detalles del producto"
    />
  );
};
