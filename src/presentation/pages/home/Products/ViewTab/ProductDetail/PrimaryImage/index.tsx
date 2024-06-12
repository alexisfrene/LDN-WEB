import React , { useState } from "react"
import { Formik } from "formik";
import {   AlertDialog,
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
    ImageLoader, } from "@components";
import { updatePrimaryImage } from "@services";
;

interface Props {
product:Product
}

export const PrimaryImage:React.FC<Props> = ({product}) => {
    const [image, setImage] = useState<string | null>(null);
    return <div className="relative">
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Icons
          type="copy_manual"
          className="absolute m-1 h-6 cursor-pointer hover:text-slate-700"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cambiar la imagen principal</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permanente y la imagen antigua se perderá.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Formik
          initialValues={{ primary_image: undefined as File | undefined }}
          onSubmit={async (values) => {
            if (values.primary_image && product.product_id) {
              await updatePrimaryImage(
                values.primary_image,
                product.product_id,
              );
            }
          }}
        >
          {({ setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ImageUploader
                name="primary_image"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setImage(url);
                    setFieldValue(
                      'primary_image',
                      e.currentTarget.files![0],
                    );
                  }
                }}
              />
              {image && <ImageLoader url={image} className="h-36 w-36" />}
              <AlertDialogFooter>
                <AlertDialogCancel type="button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction type="submit">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          )}
        </Formik>
      </AlertDialogContent>
    </AlertDialog>
    <img
      src={product.primary_image}
      className="h-60 w-60 rounded-lg"
      alt={product.name}
    />
  </div>
}