import { addVariations } from '@/services';

interface useSubmitProps {
  collection: string;
  images: FileList | null;
  id: string;
  category: string;
}

export const useSubmit = (refresh: () => void) => {
  return async (
    values: useSubmitProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { resetForm, setSubmitting }: any,
  ): Promise<void> => {
    try {
      await addVariations(values);
      await refresh();
      resetForm();
    } catch (error) {
      console.error('Error en la operación asíncrona:', error);
    } finally {
      setSubmitting(false);
    }
  };
};
