import React, { useState } from 'react';
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
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components';
import { ProductData } from './ProductData';
import { StyleData } from './StyleData';
import { VariationData } from './VariationData';
import { Formik } from 'formik';
import { updatePrimaryImage } from '@src/services';
const tabs = ['product_dates', 'styles', 'images'];

interface ModalDetailsProps {
  product: Product;
}
export const ModalDetails: React.FC<ModalDetailsProps> = ({ product }) => {
  const [image, setImage] = useState<string | null>(null);
  const tabsStyles = 'text-base w-44';
  return (
    <Tabs defaultValue={tabs[0]} className="rounded-xl bg-slate-100 p-3">
      <TabsList className="flex justify-between rounded-t-lg bg-slate-100 p-2">
        <TabsTrigger value={tabs[0]} className={tabsStyles}>
          Datos del producto
        </TabsTrigger>
        <TabsTrigger value={tabs[1]} className={tabsStyles}>
          Estilos
        </TabsTrigger>
        <TabsTrigger value={tabs[2]} className={tabsStyles}>
          Imágenes
        </TabsTrigger>
      </TabsList>
      <div className="mt-3 flex flex-col items-center justify-center">
        <div className="relative">
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

        <ScrollArea className="h-72">
          <TabsContent value={tabs[0]}>
            <ProductData
              category={product.category!}
              description={product.description!}
              name={product.name}
              price={product.price.toString()}
              product_id={product.product_id!}
              size={product.size!}
            />
          </TabsContent>
          <TabsContent value={tabs[1]}>
            <StyleData
              age={product.details?.age!}
              brand={product.details?.brand!}
              color={product.details?.color!}
              gender={product.details?.gender!}
              product_id={product.product_id!}
              style={product.details?.style!}
            />
          </TabsContent>
          <TabsContent value={tabs[2]}>
            <VariationData product={product} />
          </TabsContent>
        </ScrollArea>
      </div>
    </Tabs>
  );
};
