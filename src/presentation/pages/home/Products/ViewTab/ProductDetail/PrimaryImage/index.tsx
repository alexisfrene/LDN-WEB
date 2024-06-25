import React, { useState } from 'react';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Icons,
  ImageUploader,
  ImageLoader,
} from '@components';
import { updatePrimaryImage } from '@services';
interface Props {
  product: Product;
}

export const PrimaryImage: React.FC<Props> = ({ product }) => {
  const [image, setImage] = useState<ImagesValues[]>([]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePrimaryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product_detail'],
      });
    },
  });

  return (
    <div className="relative flex max-w-prose justify-center rounded-sm bg-slate-200 py-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div>
            <Icons
              type="copy_manual"
              className="absolute m-2 h-10 cursor-pointer rounded-sm bg-white p-1 hover:text-slate-700"
            />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar la imagen principal</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es permanente y la imagen antigua se perderá.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Formik
            initialValues={{ primary_image: [] as ImagesValues[] }}
            onSubmit={async (values) => {
              if (values.primary_image && product.product_id) {
                mutation.mutate({
                  file: values.primary_image[0].file,
                  product_id: product.product_id,
                });
              }
            }}
          >
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <ImageUploader
                  name="primary_image"
                  images={image}
                  setImages={setImage}
                />
                {values.primary_image[0]?.url && (
                  <ImageLoader
                    url={image[0]?.url}
                    className="h-36 w-36"
                    alt={product.name}
                  />
                )}
                <AlertDialogFooter>
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit">Continue</AlertDialogAction>
                </AlertDialogFooter>
              </form>
            )}
          </Formik>
        </AlertDialogContent>
      </AlertDialog>
      <div className="h-60 w-60 bg-slate-50">
        <ImageLoader
          url={product.primary_image?.toString()!}
          className="h-60 w-60 rounded-lg"
          alt={product.name}
        />
      </div>
    </div>
  );
};
