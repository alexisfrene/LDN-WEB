import React from 'react';
import { Input, Label } from '../../ui';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';

interface LabelInputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  inputType?: React.HTMLInputTypeAttribute;
}

export const LabelInput: React.FC<LabelInputProps> = ({
  onChange,
  label,
  name,
  inputType = 'text',
}) => {
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  const handleChange = onChange
    ? onChange
    : (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, e.target.value);

  return (
    <Label htmlFor={label}>
      <span> {label} :</span>
      <Input onChange={handleChange} type={inputType} value={values[name]} />
      <ErrorMessage name={name} />
    </Label>
  );
};
