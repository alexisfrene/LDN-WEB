import React, { Ref } from 'react';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { Input } from '../../ui';

interface ImageUploadInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  ref?: Ref<HTMLInputElement> | undefined;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  onChange,
  name,
  ref,
}) => {
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
      <p className="text-red-600 text-xs my-1">
        <ErrorMessage name={name} />
      </p>
    </>
  );
};
