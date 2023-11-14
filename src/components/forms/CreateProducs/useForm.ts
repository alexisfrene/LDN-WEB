export interface ProductFormData {
  description: string;
  category: string;
  mainImage: File | null;
  secondaryImages: FileList | null;
}

export const useForm = (): ProductFormData => {
  return {
    description: "",
    category: "",
    mainImage: null,
    secondaryImages: null,
  };
};
