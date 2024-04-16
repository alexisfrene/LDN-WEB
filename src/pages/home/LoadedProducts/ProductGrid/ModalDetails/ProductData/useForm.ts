export interface useFormProps {
  produc_description: string;
  produc_price: string;
  produc_brand: string;
  produc_category: string;
  produc_size: string;
}

export const useForm = (): useFormProps => {
  return {
    produc_description: "",
    produc_price: "",
    produc_brand: "",
    produc_category: "",
    produc_size: "",
  };
};

export const getDynamicValue = (
  form: useFormProps,
  key: string
): string | undefined => {
  if (key in form) {
    return form[key as keyof useFormProps];
  } else {
    return undefined;
  }
};
