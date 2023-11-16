import React, { ChangeEvent } from "react";
import { useFormikContext } from "formik";

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

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue(name, event.target.value);
  };

  return (
    <div className="mt-1">
      <h3>{title}</h3>
      <select
        {...field}
        onChange={handleOptionChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
      >
        <option value="">Seleccionar...</option>
        {options.map((option) => (
          <option key={option.type} value={option.type}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};
