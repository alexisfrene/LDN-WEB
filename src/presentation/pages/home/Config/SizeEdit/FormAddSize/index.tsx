import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Icons, Input, Label, Separator } from '@components';
import { handleSubmitAdd } from './handleSubmit';

type ValueProps = {
  id: string;
  value: string;
};

export const FormAddSize: React.FC = () => {
  const [value, setValue] = useState<string>();
  return (
    <Formik
      initialValues={{ title: '', values: [] as ValueProps[] }}
      onSubmit={(values) => handleSubmitAdd(values)}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <div>
          <Label>Nombre de la colección :</Label>
          <Input
            name="title"
            type="text"
            value={values['title']}
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

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setFieldValue('values', [
                ...values.values,
                { value, id: crypto.randomUUID() },
              ]);
              setValue('');
            }}
          >
            Agregar
          </Button>
          <div className="grid grid-cols-3 gap-3 my-3">
            {values.values.map((value: { value: string; id: string }) => {
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
                    <Label>{value.value}</Label>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>

          <Button
            type="submit"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          >
            Crear colección de tallas/números
          </Button>
        </div>
      )}
    </Formik>
  );
};
