import React, { useState } from 'react';
import { Formik } from 'formik';
import { handleSubmitAdd } from './handleSubmit';
import {
  Label,
  Input,
  ImageUploadInput,
  Button,
  Icons,
  Separator,
} from '@components';

type IconProps = {
  url: string;
  file: File;
};

type ValueProps = {
  id: string;
  icon: IconProps;
  value: string;
};
export const FormAddNew: React.FC = () => {
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
