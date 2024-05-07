import { Formik } from 'formik';
import initialValues from './initialValues';
import {
  Button,
  CardTitle,
  ImageWithSkeleton,
  Input,
  Label,
  LabelInput,
  Modal,
  ModalCategory,
  ModalSize,
} from '@components';
import handleSubmit from './handleSubmit';
import { useModal } from '@hooks';
import { useState } from 'react';

export const CreateProducts = () => {
  const [image, setImage] = useState<string | null>(null);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

  return (
    <div className="flex justify-center">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, setFieldValue, values }) => (
          <div className="grid grid-cols-3 gap-3 w-[1200px] bg-white p-10">
            <Label className="font-bold text-xl text-center mb-3 bg-slate-100 p-3 col-span-full">
              Crear producto
            </Label>
            <LabelInput label="Nombre del producto" name="name" />
            <LabelInput label="Precio" name="price" inputType="number" />
            <LabelInput label="Descripción" name="description" />
            <LabelInput label="Marca" name="details[brand]" />
            <LabelInput label="Estilo" name="details[style]" />
            <LabelInput label="Color" name="details[color]" />
            <LabelInput label="Edad" name="details[age]" inputType="number" />
            <LabelInput label="Genero" name="details[gender]" />
            <LabelInput
              label="Unidades"
              name="details[stock]"
              inputType="number"
            />
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer hover:text-slate-600 col-span-full"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const file = e.target.files?.[0];
                  const url = URL.createObjectURL(file);
                  setImage(url);
                  return setFieldValue('primary_image', e.target.files[0]);
                }
              }}
            />
            {image && <ImageWithSkeleton url={image} className="w-36 h-36" />}
            <Button
              className="col-span-full"
              variant="outline"
              onClick={() =>
                showModal(
                  'Selecciona una categoría :',
                  <ModalCategory
                    onRequestClose={hideModal}
                    handleChange={(value) => {
                      setFieldValue('category', value);
                      hideModal();
                    }}
                    values={values.category}
                  />,
                )
              }
            >
              Seleccionar categoría
            </Button>
            <Button
              className="col-span-full"
              variant="outline"
              onClick={() =>
                showModal(
                  'Selecciona un talle/numero :',
                  <ModalSize
                    onRequestClose={hideModal}
                    handleChange={(value) => {
                      setFieldValue('size', value);
                      hideModal();
                    }}
                    values={values.size}
                  />,
                )
              }
            >
              Selecciona un talle/numero
            </Button>
            <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
              <CardTitle className="text-center">{modalTitle}</CardTitle>
              {modalContent}
            </Modal>
            <Button
              className="col-span-full"
              type="submit"
              onClick={() => handleSubmit()}
            >
              Crear producto
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};
