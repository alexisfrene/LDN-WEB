import { useState } from 'react';
import { useFormik } from 'formik';
import { getDynamicValue, useForm } from './useForm';
import { handleSubmit } from './handleSubmit';
import { Button, Icons } from '@components';
import { Products } from '@src/types';
interface DataOfProductsProps {
  product: Products;
}

export const ProductData: React.FC<DataOfProductsProps> = ({ product }) => {
  const [modalEdit, setModalEdit] = useState(false);

  const dataVist = [
    {
      label: 'Descripción:',
      value: product.description,
      name: 'produc_description',
    },
    {
      label: 'Precio:',
      value: `$ ${product.price}`,
      name: 'produc_price',
    },
    {
      label: 'Marca:',
      value: product.name,
      name: 'produc_brand',
    },
    {
      label: 'Categoría:',
      value: product.category,
      name: 'produc_category',
    },
    { label: 'Numero/Talle:', value: product.size, name: 'produc_size' },
  ];

  const initialValues = useForm();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) =>
      //handleSubmit(values, { resetForm }, product.code.toString()),
      console.log('Hola'),
  });

  return (
    <div>
      <div className="flex items-center mb-5 text-2xl font-bold">
        {modalEdit ? (
          <Icons
            type="arrow_small_left"
            height={30}
            className="cursor-pointer hover:text-slate-800 hover:scale-105"
            onClick={() => setModalEdit(false)}
          />
        ) : (
          <Icons
            type="copy_manual"
            height={30}
            className="cursor-pointer hover:text-slate-800 hover:scale-105"
            onClick={() => setModalEdit(true)}
          />
        )}
        <h2 className="ml-2">Detalles del Producto</h2>
      </div>

      <form onSubmit={formik.handleSubmit}>
        {dataVist.map(({ label, value, name }, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-xl border-b font-semibold"
          >
            <label className="font-bold px-1 w-56 pb-2">{label}</label>
            {modalEdit ? (
              <input
                name={name}
                placeholder={value}
                className="bg-slate-100 pb-1 w-52 truncate px-1"
                onChange={formik.handleChange}
                value={getDynamicValue(formik.values, name)}
              />
            ) : (
              <div className="pb-1 w-52 truncate px-1">
                {value || 'No cargado'}
              </div>
            )}
          </div>
        ))}

        {modalEdit && (
          <Button type="submit" className="w-full px-4 py-2 mt-1">
            Enviar
          </Button>
        )}
      </form>
    </div>
  );
};
