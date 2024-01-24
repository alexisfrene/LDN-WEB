import { createImageVariations } from '../../../../services';

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

export const useSubmit = async (values: ProductFormData): Promise<void> => {
  await createImageVariations(values); //TODO: agregar modal o un loading
};
