import { updateProductsBySupabase } from '../../../../../../../services';
import { useFormProps } from './useForm';

interface SubmitParams {
  resetForm: () => void;
}

export const handleSubmit = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: { [key in keyof useFormProps]: any },
  { resetForm }: SubmitParams,
  id: string,
  reloadProducts: () => void,
) => {
  const filteredObject = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== ''),
  ) as useFormProps;
  await updateProductsBySupabase(filteredObject, id);
  reloadProducts();
  resetForm();
};
