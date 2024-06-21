import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { Button, Input } from '@components';

interface Props {
  name: string;
  setImages: (values: ImagesValues[]) => void;
  images: ImagesValues[];
}

export const ImageUploader: React.FC<Props> = ({ name, setImages, images }) => {
  const { errors, setFieldValue } = useFormikContext<FormikValues>();
  const inputRef = useRef<HTMLInputElement>(null);

  const removeImage = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  return (
    <>
      <Input
        ref={inputRef}
        accept="image/*"
        name={name}
        type="file"
        className={`cursor-pointer hover:text-slate-600 ${
          errors[name] && 'border-red-600 text-red-600'
        }`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setImages([...images, { url, file, id: uuidv4() }]);
          }
        }}
      />
      <p className="my-1 text-xs text-red-600">
        <ErrorMessage name={name} />
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          setFieldValue(name, images);
          removeImage();
        }}
      >
        Agregar
      </Button>
    </>
  );
};
