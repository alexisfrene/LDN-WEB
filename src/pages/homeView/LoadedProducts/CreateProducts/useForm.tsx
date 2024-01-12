import { useEffect, useState } from 'react';

export function useForm() {
  const [initialValues, setInitialValues] = useState(() => getInitialValues());

  useEffect(() => {
    setInitialValues(getInitialValues());
  }, []);

  return { initialValues };
}

function getInitialValues() {
  const specs = {
    name: '',
    price: 1,
    brand: '',
    color: '',
    description: '',
    gender: '',
    age: '',
    style: '',
  };

  return specs;
}
