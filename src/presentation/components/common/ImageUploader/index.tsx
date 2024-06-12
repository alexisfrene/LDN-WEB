import React, { Ref } from 'react';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { Input } from '@components';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  ref?: Ref<HTMLInputElement> | undefined;
}

export const ImageUploader: React.FC<Props> = ({ onChange, name, ref }) => {
  const { errors } = useFormikContext<FormikValues>();
  return (
    <>
      <Input
        ref={ref}
        accept="image/*"
        name={name}
        type="file"
        className={`cursor-pointer hover:text-slate-600 ${
          errors[name] && 'border-red-600 text-red-600'
        }`}
        onChange={onChange}
      />
      <p className="my-1 text-xs text-red-600">
        <ErrorMessage name={name} />
      </p>
    </>
  );
};
