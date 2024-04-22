import {
  AgeProduct,
  BrandProduct,
  GenderProduct,
  StyleProduct,
} from '@src/types';
import { useEffect, useState } from 'react';
export interface ProductFormData {
  name: string;
  price: number;
  brand: BrandProduct;
  color: string;
  description: string;
  gender: GenderProduct;
  age: AgeProduct;
  style: StyleProduct;
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
    brand: '' as BrandProduct,
    color: '',
    description: '',
    gender: '' as GenderProduct,
    age: '' as AgeProduct,
    style: '' as StyleProduct,
  };

  return specs;
}
