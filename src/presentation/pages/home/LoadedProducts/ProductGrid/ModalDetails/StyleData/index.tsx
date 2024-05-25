import { ProductDataTable } from '@components';
import { handleSubmit } from './handleSubmit';
import { useState } from 'react';
export interface StyleDataProps {
  style: string;
  brand: string;
  age: string;
  color: string;
  gender: string;
  product_id: string;
}

export const StyleData: React.FC<StyleDataProps> = ({
  age,
  brand,
  color,
  gender,
  product_id,
  style,
}) => {
  const [selected, setSelected] = useState({
    age,
    brand,
    color,
    gender,
    product_id,
    style,
  });
  const refresh = (data: StyleDataProps) => {
    setSelected(data);
  };
  const dataVist = [
    {
      label: 'Estilo :',
      value: selected.style,
      name: 'style',
    },
    {
      label: 'Marca :',
      value: selected.brand,
      name: 'brand',
    },
    {
      label: 'Edad :',
      value: selected.age,
      name: 'age',
    },
    {
      label: 'Color :',
      value: selected.color,
      name: 'color',
    },
    {
      label: 'Genero :',
      value: selected.gender,
      name: 'gender',
    },
  ];
  const initialValues = {
    brand: '',
    age: '',
    color: '',
    gender: '',
    styles: '',
    product_id: selected.product_id,
  };
  const submit = handleSubmit(refresh);
  return (
    <ProductDataTable
      dataVist={dataVist}
      handleSubmit={submit}
      initialValues={initialValues}
      title="Detalles del producto"
    />
  );
};
