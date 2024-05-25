import { axiosInstance, axiosInstanceFormData } from '@src/lib';
import { Category, Size } from '@src/types';

export const getAllCategories = async (): Promise<Category[] | undefined> => {
  try {
    const res = await axiosInstance.get('/categories');

    if (res.data) return res.data;
  } catch (error) {
    console.log('ERROR IN CATEGORIES -->', error);
  }
};
export const getAllSizes = async (): Promise<Size[] | undefined> => {
  try {
    const res = await axiosInstance('/size');
    return res.data;
  } catch (error) {
    console.log('ERROR IN SIZES ALL -->', error);
  }
};
export const getUrlAvatar = async () => {
  try {
    const res = await axiosInstance.get('/user/avatar');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCategoryConfig = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    for (let index = 0; index < data.values.length; index++) {
      formData.append('files', data.values[index].icon.file);
      formData.append(`values[${index}]`, data.values[index].value);
    }
    const res = await axiosInstanceFormData.post('/categories', formData);
    return res.data;
  } catch (error) {
    console.log('Error in addCategoryConfig', error);
  }
};
export const deleteCategoryConfig = () => {};
export const updateCategoryConfig = () => {};
