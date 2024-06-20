import { axiosInstance, axiosInstanceFormData } from '@src/lib';
import { toast } from 'sonner';

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

export const deleteVariationById = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/variations/${id}`);
    toast('Variación eliminada correctamente');
    return res.data;
  } catch (error) {
    console.log('Error al buscar por id las variaciones');
  }
};

export const addImageCollection = async ({
  variation_id,
  collection_id,
  file,
}: {
  variation_id: string;
  collection_id: string;
  file: File;
}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axiosInstanceFormData.patch(
      `/variations/${variation_id}?edit=add_image&collection_id=${collection_id}`,
      formData,
    );
    toast('imagen cargada con éxito');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log('Error al buscar por id las variaciones');
  }
};

export const removeImageCollection = async ({
  collection_id,
  url,
  variation_id,
}: {
  variation_id: string;
  collection_id: string;
  url: string;
}) => {
  try {
    const formData = new FormData();
    const publicId = url.match(/variations\/(\d+)/);
    const extractedNumber = publicId ? publicId[1] : null;

    if (extractedNumber) {
      console.log(extractedNumber);
      formData.append('public_id', extractedNumber);
      const res = await axiosInstanceFormData.patch(
        `/variations/${variation_id}?edit=remove_image&collection_id=${collection_id}`,
        formData,
      );
      toast('imagen cargada con éxito');
      console.log(res.data);
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error al buscar por id las variaciones');
  }
};
