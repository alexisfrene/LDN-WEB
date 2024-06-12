import { axiosInstance, axiosInstanceFormData } from '@lib';

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');

    if (response.status !== 200) return new Error();

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getImageUrl = async (publicId: string) => {
  try {
    const url = await axiosInstance.get(`products/image?public_id=${publicId}`);

    return url.data;
  } catch (error) {
    console.log('ERROR  GET IMAGE ->', error);
  }
};

export const createProducts = async (values: Product) => {
  try {
    const formData = new FormData();
    formData.append('size_id', values.size_id);
    formData.append('size_value', values.size_value);
    formData.append('category_id', values.category_id || '');
    formData.append('category_value', values.category_value || '');
    formData.append('description', values.description || '');
    formData.append('stock', String(values.stock));
    formData.append('name', values.name);
    formData.append('price', String(values.price));
    if (values.primary_image) {
      formData.append('file', values.primary_image);
    }
    const details = values?.details;
    formData.append('details[color]', details?.color || '');
    formData.append('details[age]', details?.age || '');
    formData.append('details[gender]', details?.gender || '');
    formData.append('details[brand]', details?.brand || '');
    formData.append('details[style]', details?.style || '');
    const response = await axiosInstanceFormData.post('/products', formData);
    if (!response) {
      return 'Error al crear un producto en la base de datos';
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeProduct = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductDetails = async (
  newDetails: Details,
  product_id: string,
) => {
  try {
    const res = await axiosInstance.patch(
      `/products/${product_id}?type=details`,
      newDetails,
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductData = async (
  newDetails: any,
  product_id: string,
) => {
  try {
    const res = await axiosInstance.patch(
      `/products/${product_id}?type=data`,
      newDetails,
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePrimaryImage = async (file: File, product_id: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosInstanceFormData.patch(
      `/products/${product_id}?type=image`,
      formData,
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
