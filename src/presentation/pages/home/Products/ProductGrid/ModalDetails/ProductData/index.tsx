import { useState } from 'react';
import { useForm } from './useForm';
import { handleSubmit } from './handleSubmit';
import { ProductDataTable } from '@components';

export interface DataOfProductsProps {
  price: string;
  description: string;
  category: string;
  size: string;
  product_id: string;
  name: string;
}

export const ProductData: React.FC<DataOfProductsProps> = ({
  name,
  price,
  description,
  category,
  size,
  product_id,
}) => {
  const [selected, setSelected] = useState({
    name,
    price,
    description,
    category,
    size,
    product_id,
  });
  const refresh = (data: DataOfProductsProps) => {
    setSelected(data);
  };
  const dataVist = [
    {
      label: 'Nombre :',
      value: selected.name,
      name: 'name',
    },
    {
      label: 'Precio:',
      value: `$ ${selected.price}`,
      name: 'price',
    },
    {
      label: 'Descripción:',
      value: selected.description,
      name: 'description',
    },
    {
      label: 'Categoría:',
      value: selected.category,
      name: 'category',
    },
    { label: 'Numero/Talle:', value: selected.size, name: 'size' },
  ];
  const initialValues = useForm(selected.product_id!);
  const submit = handleSubmit(refresh);

  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={submit}
      initialValues={initialValues}
      title="Información básica"
    />
  );
};
