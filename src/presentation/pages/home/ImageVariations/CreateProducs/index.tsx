//import defaultImage from '@assets/default.png';
import {
  Button,
  CardTitle,
  Icons,
  ImageUploadInput,
  Separator,
  Label,
  LabelInput,
  Modal,
  ModalCategory,
  ModalSize,
} from '@src/presentation/components';
import { useModal } from '@src/presentation/hooks';
import { ErrorMessage, Formik } from 'formik';
import { useState } from 'react';

type ImagesValues = {
  url: string;
  file: File;
};

export const CreateProducts: React.FC = () => {
  const [image, setImage] = useState<ImagesValues>();
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();
  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{
          category: { category_id: '', category_value_id: '' },
          size: { size_id: '', size_value_id: '' },
          title: '',
          images: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <LabelInput label="Titulo" name="title" inputType="text" />
            <ImageUploadInput
              name="images"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImage({
                    url,
                    file: e.currentTarget.files![0],
                  });
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFieldValue('images', [
                  ...values.images,
                  { image, id: crypto.randomUUID() },
                ]);
              }}
            >
              Agregar
            </Button>
            <div className="my-3 grid grid-cols-2 gap-3">
              {values.images.map((value: any) => {
                return (
                  <div key={value.id} className="relative bg-slate-200">
                    <Icons
                      type="close"
                      className="absolute right-0 h-4 cursor-pointer bg-red-500"
                      onClick={() => {
                        const res = values.images.filter(
                          (e: { id: string }) => e?.id !== value.id,
                        );
                        setFieldValue('values', res);
                      }}
                    />

                    <div className="m-1 flex justify-center">
                      <img
                        src={value.image.url}
                        className="h-[64px] w-[64px]"
                      />
                    </div>
                    <div className="m-1 flex justify-center">
                      <Label>{value.value}</Label>
                    </div>
                    <Separator />
                  </div>
                );
              })}
            </div>
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
            <ErrorMessage name="category" />
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
              onClick={() => handleSubmit()}
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
