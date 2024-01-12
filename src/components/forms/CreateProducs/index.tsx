import { useState, ChangeEvent } from 'react';
import { Field, FieldProps, Formik } from 'formik';
import { useSubmit } from './useSubmit';
import { useForm } from './useForm';
import { Dropdown, DropdownInput, Input, Label } from '../../../components';
import {
  brands,
  colors,
  genders,
  producsCategory,
  styles,
} from '../../../mocks';
import defaultImage from '../../../assets/default.png';
import { ImageWithSkeleton } from '@/components/common/ImageWithSkeleton';

export const CreateProducts: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [secondaryImages, setSecondaryImages] = useState<
    FileList | null | File[]
  >(null);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  const handleSecondaryImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSecondaryImages(files);
    }
  };

  return (
    <div className="flex justify-center">
      <Formik initialValues={useForm()} onSubmit={useSubmit}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="mb-4 w-[1200px] bg-white p-10"
          >
            <div className="h-96 overflow-y-auto overflow-x-hidden">
              {selectedImage && (
                <div className="relative h-80 m-3">
                  <ImageWithSkeleton url={selectedImage} />
                  {defaultImage !== selectedImage && (
                    <button
                      onClick={() => {
                        setFieldValue('mainImage', null);
                        setSelectedImage(defaultImage);
                      }}
                      className="absolute top-0 right-0 mt-1 h-8 w-8 bg-red-500 text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
                    >
                      X
                    </button>
                  )}
                </div>
              )}
              <div className="grid grid-cols-5 gap-5">
                {secondaryImages &&
                  Array.from(secondaryImages).map((file, index) => {
                    const imageUrl = URL.createObjectURL(file);
                    return (
                      <div key={index} className="relative col-span-1">
                        <ImageWithSkeleton url={imageUrl} />
                        <button
                          onClick={() => {
                            const filesArray = Array.from(secondaryImages);
                            const newFileList = filesArray.filter(
                              (e) => e.name !== file.name,
                            );
                            setFieldValue('secondaryImages', newFileList);
                            setSecondaryImages(newFileList);
                          }}
                          className="absolute top-0 right-0 mt-1 h-8 w-8 bg-red-500 text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <Label>Selecciona una imagen principal :</Label>
              <Input
                type="file"
                name="mainImage"
                onChange={(event) => {
                  handleImageChange(event);
                  setFieldValue('mainImage', event.currentTarget.files![0]);
                }}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <Label>Selecciona las imágenes secundarias:</Label>
              <Input
                type="file"
                name="secondaryImages" // Nombre coincidente con el backend
                multiple
                onChange={(event) => {
                  handleSecondaryImageChange(event);
                  setFieldValue('secondaryImages', event.currentTarget.files);
                }}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <Label>Ingresa una descripción :</Label>
              <Input
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Zapatillas Nike Blancas ..."
              />
            </div>
            <Label>Nombre de la coleccion de imagenes: :</Label>
            <Input
              name="collection"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.collection}
              placeholder="Imagenes sin fondo ..."
            />
            <Field name="category">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona una opción:"
                  options={producsCategory}
                  name={field.name}
                />
              )}
            </Field>
            <Field name="color">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona un color"
                  options={colors}
                  name={field.name}
                />
              )}
            </Field>
            <Field name="gender">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona un genero"
                  options={genders}
                  name={field.name}
                />
              )}
            </Field>
            <Field name="brand">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona una marca"
                  options={brands}
                  name={field.name}
                />
              )}
            </Field>
            {/* <Field name="style">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona estilo"
                  options={styles}
                  name={field.name}
                />
              )}
            </Field> */}
            <Dropdown variant="styles" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 text-white px-4 py-2 rounded mt-4 h-20 w-44 text-lg hover:bg-amber-400 hover:text-gray-200"
            >
              Crear producto
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
