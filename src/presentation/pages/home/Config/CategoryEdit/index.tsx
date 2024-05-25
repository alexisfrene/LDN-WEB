import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Category } from '@src/types';
import { useModal } from '@presentation/hooks';
import { getAllCategories } from '@src/services';
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Icons,
  Input,
  Label,
  ImageUploadInput,
  Separator,
} from '@components';
import { handleSubmitAdd } from './handleSubmit';

type IconProps = {
  url: string;
  file: File;
};

type ValueProps = {
  id: string;
  icon: IconProps;
  value: string;
};

const FormAddCategory = () => {
  const [value, setValue] = useState('');
  const [icon, setIcon] = useState<IconProps>();
  return (
    <Formik
      initialValues={{
        title: '',
        values: [] as ValueProps[],
      }}
      onSubmit={async (values) => await handleSubmitAdd(values, () => {})}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <div>
          <Label>Nombre de la colección :</Label>
          <Input
            name="title"
            type="text"
            onChange={(e) => setFieldValue('title', e.target.value)}
          />
          <Label>Valores :</Label>
          <Input
            name="values"
            type="text"
            minLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Label>Ingrese un icono :</Label>
          <ImageUploadInput
            name="icon"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setIcon({
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
              setFieldValue('values', [
                ...values.values,
                { value, icon, id: crypto.randomUUID() },
              ]);
              setValue('');
            }}
          >
            Agregar
          </Button>
          <div className="grid grid-cols-2 gap-3 my-3">
            {values.values.map(
              (value: { value: string; icon: { url: string }; id: string }) => {
                return (
                  <div key={value.id} className="bg-slate-200 relative">
                    <Icons
                      type="close"
                      className="h-4 bg-red-500 cursor-pointer absolute right-0"
                      onClick={() => {
                        console.log('click');
                        const res = values.values.filter(
                          (e) => e.id !== value.id,
                        );
                        setFieldValue('values', res);
                      }}
                    />

                    <div className="flex justify-center m-1">
                      <img src={value.icon.url} className="w-[64px] h-[64px]" />
                    </div>
                    <div className="flex justify-center m-1">
                      <Label>{value.value}</Label>
                    </div>
                    <Separator />
                  </div>
                );
              },
            )}
          </div>

          <Button
            type="submit"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          >
            Crear categoría
          </Button>
        </div>
      )}
    </Formik>
  );
};

export const CategoryEdit: React.FC = () => {
  const [category, setCategory] = useState<Category[] | []>([]);
  const getCategory = async () => {
    const res = await getAllCategories();
    if (Array.isArray(res)) return setCategory(res);
  };
  const { hideModal, isOpenModal, modalContent, modalTitle, showModal } =
    useModal();

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="min-w-[70vw] flex flex-col">
      {category.length === 0 ? (
        <div className="min-h-[50vh] flex justify-center">
          <div className="flex justify-center flex-col">
            <p>No tienes ninguna categoría cargada </p>
            <Icons type="cog_6_tooth" height={100} />
            <Button
              variant="default"
              onClick={() => {
                return showModal(
                  'Agregar una categoría nueva',
                  <FormAddCategory />,
                );
              }}
            >
              Agregar una categoría nueva
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {category.map((value) => (
            <div
              key={value.category_id}
              className="p-4 border rounded-md shadow-md"
            >
              <h2 className="text-xl font-bold mb-4">{value.title}</h2>
              <div className="grid grid-cols-1 gap-2">
                {value.values.map((e) => (
                  <div key={e.id} className="flex items-center gap-2">
                    <img
                      src={e.icon_url}
                      alt={e.value}
                      className="h-12 w-12 rounded-full"
                    />
                    <p className="text-lg">{e.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button
            variant="default"
            onClick={() => {
              return showModal(
                'Agregar una categoría nueva',
                <FormAddCategory />,
              );
            }}
          >
            Agregar una categoría nueva
          </Button>
        </div>
      )}
      <Sheet open={isOpenModal} onOpenChange={hideModal}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{modalTitle}</SheetTitle>
          </SheetHeader>
          {modalContent}
        </SheetContent>
      </Sheet>
    </div>
  );
};
