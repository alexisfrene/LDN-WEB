import { ChangeEvent, useState } from 'react';
import { Formik } from 'formik';
import { useForm } from './useForm';
import { useSubmit } from './useSubmit';
import {
  LoadingIndicator,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Button,
} from '@/components';

export const FormAddImages: React.FC<{
  id: string;
  category: string;
  refresh: () => void;
}> = ({ id, category, refresh }) => {
  const [images, setImages] = useState<FileList | null | File[]>(null);
  const handlerImagesFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages(files);
    }
  };

  return (
    <Card className="min-h-[84vh] flex flex-col">
      <CardHeader>
        <CardTitle>CREAR NUEVA COLECCIÓN</CardTitle>
        <CardDescription>Agregar mas variantes del producto</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={useForm(id, category)}
          onSubmit={useSubmit(refresh)}
        >
          {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Label>Ingresa un nombre para la colección:</Label>
              <Input
                placeholder="Imágenes sin fondo.."
                name="collection"
                value={values.collection}
                onChange={(e) => {
                  setFieldValue('collection', e.target.value);
                }}
              />
              <Label>
                Ingresa las imágenes :
                <div className="cursor-pointer flex h-9 w-full rounded-md border px-3 py-2 text-sm font-normal hover:ring-1 hover:ring-ring text-gray-550 mb-2">
                  <Input
                    type="file"
                    multiple
                    name="images"
                    className="hidden"
                    onChange={(e) => {
                      handlerImagesFiles(e);
                      setFieldValue('images', e.currentTarget.files);
                    }}
                  />
                  Seleccionar
                </div>
              </Label>
              <div className="grid grid-cols-5 gap-5">
                {values.images &&
                  images &&
                  Array.from(images).map((file, index) => {
                    const imageUrl = URL.createObjectURL(file);
                    return (
                      <div key={index} className="relative col-span-1">
                        <img
                          src={imageUrl}
                          alt={`Imagen secundaria ${index + 1}`}
                          className="m-1 object-cover"
                        />
                        <button
                          onClick={() => {
                            const filesArray = Array.from(images);
                            const newFileList = filesArray.filter(
                              (e) => e.name !== file.name,
                            );
                            setFieldValue('images', newFileList);
                            setImages(newFileList);
                          }}
                          className="absolute top-0 right-0 mt-1 h-8 w-8 bg-red-500 text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
              </div>
              <div className="flex-grow" />
              <Button
                type="submit"
                className="w-96 self-center mb-12"
                disabled={isSubmitting}
              >
                Agregar images
              </Button>
              <LoadingIndicator isLoading={isSubmitting} />
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
