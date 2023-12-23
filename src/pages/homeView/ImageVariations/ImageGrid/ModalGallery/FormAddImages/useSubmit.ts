import { addVariations } from '@/services';

interface useSubmitProps {
  collection: string;
  images: FileList | null;
  id: string;
  category: string;
}

export const useSubmit = async (
  values: useSubmitProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { resetForm, setSubmitting }: any,
): Promise<void> => {
  try {
    await addVariations(values);
    resetForm();
  } catch (error) {
    console.error('Error en la operación asíncrona:', error);
  } finally {
    setSubmitting(false);
  }
};
