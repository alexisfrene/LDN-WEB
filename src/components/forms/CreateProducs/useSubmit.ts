import axios from "axios";

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

export const useSubmit = async (values: ProductFormData): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("category", values.category);
    if (values.mainImage) {
      formData.append("mainImage", values.mainImage.name);
      formData.append("files", values.mainImage);
    }
    if (values.secondaryImages) {
      for (let i = 0; i < values.secondaryImages.length; i++) {
        formData.append("files", values.secondaryImages[i]);
      }
    }
    formData.append("details[color]", values.color);
    formData.append("details[gender]", values.gender);
    formData.append("details[brand]", values.brand);
    formData.append("details[style]", values.style);
    await axios.post("http://localhost:3001/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
