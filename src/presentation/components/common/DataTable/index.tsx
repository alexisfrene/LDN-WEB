import { useEffect, useState } from 'react';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import {
  Button,
  CardTitle,
  Icons,
  Modal,
  ModalCategory,
  ModalSize,
} from '@components';
import { useModal } from '@src/presentation/hooks';

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
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  const btnSize = () => (
    <Button
      className="w-full bg-slate-300 hover:bg-slate-400"
      variant="outline"
      type="button"
      onClick={() =>
        showModal(
          'Selecciona un talle/numero :',
          <ModalSize
            onRequestClose={hideModal}
            handleChange={(value) => {
              formik.setFieldValue('size', value);
              hideModal();
            }}
            values={formik.values.size}
          />,
        )
      }
    >
      Selecciona un talle/numero
    </Button>
  );

  const btnCategory = () => (
    <Button
      className="w-full bg-slate-300 hover:bg-slate-400"
      variant="outline"
      type="button"
      onClick={() =>
        showModal(
          'Selecciona una categoría :',
          <ModalCategory
            onRequestClose={hideModal}
            handleChange={(value) => {
              formik.setFieldValue('category', value);
              hideModal();
            }}
            values={formik.values.category}
          />,
        )
      }
    >
      Seleccionar categoría
    </Button>
  );

  useEffect(() => {
    setTimeout(() => setModalEdit(false), 200);
  }, [initialValues]);

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
              <>
                {name === 'size' && btnSize()}
                {name === 'category' && btnCategory()}
                {name !== 'category' && name !== 'size' && (
                  <input
                    name={name}
                    placeholder={value}
                    className="bg-slate-100 pb-1 w-52 truncate px-1"
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                  />
                )}
              </>
            ) : (
              <div className="pb-1 w-52 truncate px-1">
                {value || 'No cargado'}
              </div>
            )}
          </div>
        ))}

        <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
          <CardTitle className="text-center">{modalTitle}</CardTitle>
          {modalContent}
        </Modal>

        {modalEdit && (
          <Button type="submit" className="w-full px-4 py-2 mt-1">
            Enviar
          </Button>
        )}
      </form>
    </div>
  );
};
