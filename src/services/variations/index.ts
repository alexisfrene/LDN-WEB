import { axiosInstance, axiosInstanceFormData } from '@src/lib';

export const getAllVariations = async () => {
  try {
    const res = await axiosInstance('/variations');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createVariation = async (values: Variation) => {
  try {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('label', values.label);
    if (values.category_id && values.category_value) {
      formData.append('category_value', values.category_value);
      formData.append('category_id', values.category_id);
    }
    if (values.files) {
      values.files.forEach((file) => formData.append('files', file));
    }

    const res = await axiosInstanceFormData.post('/variations', formData);
    return res.data;
  } catch (error) {
    console.log('Error en services createVariation ->', error);
  }
};

export const getVariationById = async (id: string) => {
  try {
    const res = await axiosInstance(`/variations/${id}`);
    return res.data;
  } catch (error) {
    console.log('Error al buscar por id las variaciones');
  }
};
