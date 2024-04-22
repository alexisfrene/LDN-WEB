import React from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components';
import { DropdownTypes } from '@presentation/mocks';

interface Option {
  type: string;
  title: string;
}

interface DropdownInputProps {
  title: string;
  options: Option[];
  name: string;
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  title,
  options,
  name,
}) => {
  const formik = useFormikContext();
  const field = formik.getFieldProps(name);

  const handleOptionChange = (value: string) => {
    formik.setFieldValue(name, value);
  };

  return (
    <Select
      {...field}
      onValueChange={handleOptionChange}
      defaultValue={options[0].type}
    >
      <Label>{title}</Label>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.type} key={option.type}>
            {option.title.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

type FieldFormProps = {
  name: string;
  title: string;
  option: Option[];
};
export const FieldForm: React.FC<FieldFormProps> = ({
  name,
  title,
  option,
}) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps<string>) => (
        <DropdownInput title={title} options={option} name={field.name} />
      )}
    </Field>
  );
};

type DropdownProps = {
  variant: 'colors' | 'genders' | 'brands' | 'styles' | 'ages';
};

export const Dropdown: React.FC<DropdownProps> = ({ variant }) => {
  const { name, title, options } = DropdownTypes[variant];
  return <FieldForm name={name} title={title} option={options} />;
};
