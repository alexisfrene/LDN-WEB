import React from 'react';
import { Formik } from 'formik';
import { handleSubmitAddValues } from './handleSubmit';
import { Label, Input, Button } from '@components';

interface FormAddNewValueProps {
  size_id: string;
}
export const FormAddNewValue: React.FC<FormAddNewValueProps> = ({
  size_id,
}) => {
  return (
    <Formik
      initialValues={{
        value: '',
      }}
      onSubmit={async (values) => {
        await handleSubmitAddValues(values, size_id);
      }}
    >
      {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <div>
          <Label>Nombre del nuevo valor :</Label>
          <Input
            name="value"
            type="text"
            minLength={3}
            value={values['value']}
            onChange={(e) => setFieldValue('value', e.target.value)}
          />
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
          >
            Crear numero / talla
          </Button>
        </div>
      )}
    </Formik>
  );
};
