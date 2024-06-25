import React, { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import {
  Button,
  CardTitle,
  Icons,
  ImageUploader,
  ImageLoader,
  Label,
  LabelInput,
  Modal,
  ModalCategory,
  ModalSize,
} from '@components';
import { useModal } from '@hooks';
import handleSubmit from './handleSubmit';
import initialValues from './initialValues';
import validationSchema from './validationSchema';

export const CreateProducts: React.FC = () => {
  const [image, setImage] = useState<ImagesValues[]>([]);
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="grid w-[1200px] grid-cols-3 gap-3 bg-white p-10"
          >
            <Label className="col-span-full mb-3 bg-slate-100 p-3 text-center text-xl font-bold">
              Crear producto
            </Label>
            <LabelInput label="Nombre del producto" name="name" />
            <LabelInput label="Precio" name="price" inputType="number" />
            <LabelInput label="Descripción" name="description" />
            <LabelInput label="Marca" name="detail[brand]" />
            <LabelInput label="Estilo" name="detail[style]" />
            <LabelInput label="Color" name="detail[color]" />
            <LabelInput label="Edad" name="detail[age]" />
            <LabelInput label="Genero" name="detail[gender]" />
            <LabelInput
              label="Unidades"
              name="details[stock]"
              inputType="number"
            />
            <ImageUploader name="images" images={image} setImages={setImage} />
            {values.images[0]?.url && (
              <ImageLoader
                url={image[0]?.url}
                className="h-36 w-36"
                alt="pre-image-product"
              />
            )}
            <Button
              className="col-span-full"
              variant="outline"
              type="button"
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
            <ErrorMessage name="category" />
            <Button
              className="col-span-full"
              variant="outline"
              type="button"
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
            <ErrorMessage name="size" />
            <Modal isOpen={isOpenModal} onRequestClose={hideModal}>
              <CardTitle className="text-center">{modalTitle}</CardTitle>
              {modalContent}
            </Modal>
            <Button
              className="col-span-full"
              type="submit"
              disabled={
                isSubmitting ||
                !image ||
                !values.category.category_id ||
                !values.size.size_id
              }
            >
              <div className="mx-1 w-5">
                {isSubmitting && (
                  <Icons type="refresh" className="h-5 animate-spin" />
                )}
              </div>
              Crear producto
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
