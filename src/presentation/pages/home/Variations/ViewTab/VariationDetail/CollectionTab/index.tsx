import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
  ImageUploader,
  LabelInput,
  Separator,
} from '@src/presentation/components';

interface Props {
  variationId: string;
}

export const CollectionTab: React.FC<Props> = () => {
  const [images, setImages] = useState<ImagesValues[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear una nueva colección </CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{ label: '', images: [] as ImagesValues[] }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <LabelInput label="Nombre" name="label" />
              <ImageUploader
                name="images"
                images={images}
                setImages={setImages}
              />
              <div className="my-3 grid grid-cols-2 gap-3">
                {values.images.map((value: ImagesValues) => {
                  return (
                    <div key={value.id} className="relative bg-slate-200">
                      <Icons
                        type="close"
                        className="absolute right-0 h-4 cursor-pointer bg-red-500"
                        onClick={() => {
                          const res = values.images.filter(
                            (e: { id: string }) => e?.id !== value.id,
                          );
                          setFieldValue('images', res);
                          setImages(res);
                        }}
                      />

                      <div className="m-1 flex justify-center">
                        <img src={value.url} className="h-[64px] w-[64px]" />
                      </div>
                      <Separator />
                    </div>
                  );
                })}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => handleSubmit()}
              >
                <div
                  className={`${isSubmitting ? 'relative' : 'hidden'} mx-1 w-5`}
                >
                  {isSubmitting && (
                    <Icons type="refresh" className="h-5 animate-spin" />
                  )}
                </div>
                Crear producto
              </Button>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
