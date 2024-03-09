import axios from 'axios';
import { toast } from 'sonner';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UUID } from '@/types';
import { urlImageVariation } from '@/lib';

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

export const variantsApi = createApi({
  reducerPath: 'variantsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_HOST_NAME}/api/products`,
  }),
  endpoints: (builder) => ({
    getVariantsByCategory: builder.query({
      query: (category) => `?category=${category}`,
    }),
    getAllVariants: builder.query({
      query: () => '/',
    }),
  }),
});
export const imagesVariantsApi = createApi({
  reducerPath: 'imagesVariantsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_HOST_NAME,
  }),
  endpoints: (builder) => ({
    getImageVariants: builder.query({
      query: (image) => image,
    }),
  }),
});
export const fetchProducts = () => {
  try {
    const data = axios.get(`${import.meta.env.VITE_HOST_NAME}/api/products`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const insertImageId = async (
  product_id: string,
  product_image_id: string,
) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_HOST_NAME
      }api/products?product_id=${product_id}&product_image_id=${product_image_id}`,
      {
        method: 'POST',
      },
    );
    if (response.ok) {
      toast('Imágenes cargadas con éxito !');
      return true;
    } else {
      throw new Error('Error al obtener los productos');
    }
  } catch (error) {
    console.error(error);
    // Manejar errores (mostrar un mensaje de error, etc.)
  }
};

export const fetchProductsForCategory = async (category: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_HOST_NAME}/api/products?category=${category}`,
    );
    if (response.ok) {
      const { data } = await response.json();
      if (Array.isArray(data)) {
        return data;
      } else {
        throw new Error(
          'No se encontró un array de productos en los datos recibidos',
        );
      }
    } else {
      throw new Error('Error al obtener los productos');
    }
  } catch (error) {
    console.error(error);
    // Manejar errores (mostrar un mensaje de error, etc.)
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_HOST_NAME}/api/products/${id}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      console.log(`Producto con ID ${id} eliminado correctamente`);
    } else {
      throw new Error('No se pudo eliminar el producto');
    }
  } catch (error) {
    console.error('Error al eliminar un producto por id');
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_HOST_NAME}/api/products/${id}`,
    );
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error('No se pudo encontrado el producto');
    }
  } catch (error) {
    console.error('Error al encontrado un producto por id');
  }
};

export const createImageVariations = async (values: ProductFormData) => {
  try {
    const formData = new FormData();
    formData.append('description', values.description || 'Sin descripción');
    formData.append('category', values.category);
    formData.append('collection', values.collection);
    if (values.mainImage) {
      formData.append('mainImage', values.mainImage.name);
      formData.append('files', values.mainImage);
    }
    if (values.secondaryImages) {
      for (let i = 0; i < values.secondaryImages.length; i++) {
        formData.append('files', values.secondaryImages[i]);
      }
    }
    formData.append('details[color]', values.color);
    formData.append('details[gender]', values.gender);
    formData.append('details[brand]', values.brand);
    formData.append('details[style]', values.style);
    await axios.post(
      `${import.meta.env.VITE_HOST_NAME}/api/products`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

interface addVariationsProps {
  collection: string;
  category: string;
  images: FileList | null;
  id: string;
}

export const addVariations = async (values: addVariationsProps) => {
  try {
    const formData = new FormData();
    formData.append('collection', values.collection);
    formData.append('category', values.category);
    if (values.images) {
      for (let i = 0; i < values.images.length; i++) {
        formData.append('files', values.images[i]);
      }
    }
    await axios.put(
      `${import.meta.env.VITE_HOST_NAME}/api/products/${
        values.id
      }?variation_add=true`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

export const removeCollection = async (
  idVariations: string,
  idCollection: string,
) => {
  try {
    await axios.delete(
      `${
        import.meta.env.VITE_HOST_NAME
      }api/products/${idVariations}?variation_remove=${idCollection}`,
    );
  } catch (error) {
    console.error(error);
  }
};

type modifyCollectionType = {
  images: string[];
  name: string;
  idVariation: UUID;
  idCollection: UUID;
};

export const modifyCollection = async (data: modifyCollectionType) => {
  const { images, name, idCollection, idVariation } = data;
  const formData = new FormData();
  const newImages = images.filter((url) => !urlImageVariation.test(url));
  if (newImages) {
    for (let i = 0; i < newImages.length; i++) {
      const blob = await fetch(newImages[i]).then((r) => r.blob());
      const newFile = new File([blob], `filename-${Date.now()}.jpg`);
      formData.append('files', newFile);
    }
  }
  const lastImages = images.filter((url) => urlImageVariation.test(url));
  lastImages.map((url) => formData.append('images', url));
  formData.append('name', name);
  try {
    const res = await axios.put(
      `${
        import.meta.env.VITE_HOST_NAME
      }api/products/${idVariation}?id_collection=${idCollection}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};

type editDetailsImageVariationsProps = {
  type: string;
  value: string;
  id: UUID;
};
export const editDetailsImageVariations = async (
  data: editDetailsImageVariationsProps,
) => {
  const formData = new FormData();
  formData.append(data.type, data.value);
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_HOST_NAME}/api/products/${data.id}?edit=details`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const { useGetImageVariantsQuery } = imagesVariantsApi;
export const { useGetVariantsByCategoryQuery, useGetAllVariantsQuery } =
  variantsApi;
