import axios from "axios";

export interface ProductFormData {
  description: string;
  category: string;
  mainImage: File | null;
  secondaryImages: FileList | null;
}

export const useSubmit = async (values: ProductFormData): Promise<void> => {
  try {
    console.log(values);
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
    const res = await axios.post(
      "http://localhost:3001/api/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(values, res);
  } catch (error) {
    console.log(error);
  }
};
