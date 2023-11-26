import { updateProductsBySupabase } from "../../../../../../services";
import { useFormProps } from "./useForm";

interface SubmitParams {
  resetForm: () => void;
}

export const handleSubmit = async (
  values: useFormProps,
  { resetForm }: SubmitParams,
  id: string,
  reloadProducts: () => void
) => {
  const filteredObject = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== "")
  );
  await updateProductsBySupabase(filteredObject, id);
  reloadProducts();
  resetForm();
};
