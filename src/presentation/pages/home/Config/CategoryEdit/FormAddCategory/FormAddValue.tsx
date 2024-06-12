import React, { useState } from 'react';
import { Formik } from 'formik';
import { handleSubmitAddValues } from './handleSubmit';
import { Label, Input, ImageUploadInput, Button } from '@components';

type IconProps = {
  url: string;
  file: File;
};

interface FormAddNewValueProps {
  category_id: string;
}
export const FormAddNewValue: React.FC<FormAddNewValueProps> = ({
  category_id,
}) => {
  const [icon, setIcon] = useState<IconProps>();
  return (
    <Formik
      initialValues={{
        value: '',
        icon: null,
      }}
      onSubmit={async (values) => {
        await handleSubmitAddValues(values, category_id);
      }}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <div>
          <Label>Nombre de los nuevos valores :</Label>
          <Input
            name="value"
            type="text"
            minLength={3}
            value={values.value}
            onChange={(e) => setFieldValue('value', e.target.value)}
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
                setFieldValue('icon', e.currentTarget.files![0]);
              }
            }}
          />
          <div>
            <p>Valor :</p>
            <p>{values.value || 'Ej: Zapatillas deportivas'}</p>
            <img src={icon?.url} className="h-36 w-36 bg-slate-300" />
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
