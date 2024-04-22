import { createImageVariations } from '@src/services';
import { useContext } from 'react';
import { LoadingContext, SnackbarContext } from '@presentation/context';

export interface ProductFormData {
  description: string;
  category: string;
  mainImage: File | null;
  secondaryImages: FileList | null;
  color: string;
  gender: string;
  brand: string;
  style: string;
  collection: string;
}

export const useSubmit = () => {
  const { showErrorSnackbar, showSuccessSnackbar } =
    useContext(SnackbarContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  return async (values: ProductFormData): Promise<void> => {
    try {
      startLoading();
      await createImageVariations(values);
      showSuccessSnackbar('Imágenes cargadas con éxito!');
    } catch (error) {
      showErrorSnackbar(`Error al crear un variación -> ${error}`);
    } finally {
      stopLoading();
    }
  };
};
