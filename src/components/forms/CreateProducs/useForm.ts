export interface ProductFormData {
  description: string;
  category: string;
  mainImage: File | null;
  secondaryImages: FileList | null;
  color: string;
  gender: string;
  brand: string;
  style: string;
}
export const useForm = (): ProductFormData => {
  return {
    description: "",
    category: "",
    mainImage: null,
    secondaryImages: null,
    color: "UNSPECIFIED",
    gender: "UNSPECIFIED",
    brand: "UNSPECIFIED",
    style: "UNSPECIFIED",
  };
};
