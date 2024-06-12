import React from 'react';
import { ErrorMessage, FormikValues, useFormikContext } from 'formik';
import { Input, Label } from '@components';

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
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();
  const handleChange = onChange
    ? onChange
    : (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(name, e.target.value);

  return (
    <Label htmlFor={label}>
      <span className={errors[name] && 'text-red-600'}> {label} :</span>
      <Input
        onChange={handleChange}
        type={inputType}
        value={values[name]}
        className={errors[name] && 'border-red-600'}
      />
      <p className="my-1 h-1 text-xs text-red-600">
        <ErrorMessage name={name} />
      </p>
    </Label>
  );
};
