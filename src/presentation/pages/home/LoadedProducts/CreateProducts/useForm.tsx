import { useEffect, useState } from 'react';
export interface ProductFormData {
  name: string;
  price: number;
  description: string;
}
export function useForm(): ProductFormData {
  const [initialValues, setInitialValues] = useState(() => getInitialValues());

  useEffect(() => {
    setInitialValues(getInitialValues());
  }, []);

  return initialValues;
}

function getInitialValues(): ProductFormData {
  const specs = {
    name: '',
    price: 1,
    description: '',
  };

  return specs;
}
