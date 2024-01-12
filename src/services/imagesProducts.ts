import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
const loadAbort = () => {
  const controller = new AbortController();
  return controller;
};
export const variantsApi = createApi({
  reducerPath: 'variantsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/products',
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
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getImageVariants: builder.query({
      query: (image) => image,
    }),
  }),
});
export const fetchProducts = () => {
  const controller = loadAbort();
  return {
    call: axios.get('http://localhost:3001/api/products', {
      signal: controller.signal,
    }),
    controller,
  };
};

export const insertImageId = async (
  product_id: string,
  product_image_id: string,
) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/products?product_id=${product_id}&product_image_id=${product_image_id}`,
      {
        method: 'POST',
      },
    );
    if (response.ok) {
      const { data } = await response.json();
      return data;
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
      `http://localhost:3001/api/products?category=${category}`,
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
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'DELETE',
    });
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
    const response = await fetch(`http://localhost:3001/api/products/${id}`);
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
    formData.append('description', values.description || 'Sin descripcion');
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
    await axios.post('http://localhost:3001/api/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
      `http://localhost:3001/api/products/${values.id}?variation_add=true`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      `http://localhost:3001/api/products/${idVariations}?variation_remove=${idCollection}`,
    );
  } catch (error) {
    console.log(error);
  }
};
export const { useGetImageVariantsQuery } = imagesVariantsApi;
export const { useGetVariantsByCategoryQuery, useGetAllVariantsQuery } =
  variantsApi;
