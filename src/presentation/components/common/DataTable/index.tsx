import { useState } from 'react';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { Button, Icons } from '@components';

type DataRowType = {
  label?: string;
  value?: string;
  name: string;
};
interface DataOfProductsProps {
  dataVist: DataRowType[];
  initialValues: FormikValues;
  title: string;
  handleSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void;
}

export const ProductDataTable: React.FC<DataOfProductsProps> = ({
  dataVist,
  initialValues,
  handleSubmit,
  title,
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
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
        <h2 className="ml-2">{title}</h2>
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
                value={formik.values[name]}
              />
            ) : (
              <div className="pb-1 w-52 truncate px-1">
                {value || 'No cargado'}
              </div>
            )}
          </div>
        ))}

        {modalEdit && (
          <Button
            type="submit"
            className="w-full px-4 py-2 mt-1"
            disabled={formik.isSubmitting}
          >
            Enviar
          </Button>
        )}
      </form>
    </div>
  );
};
