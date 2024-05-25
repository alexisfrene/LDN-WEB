import { axiosInstance } from '@src/lib';
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

export const addCategoryConfig = () => {};
export const deleteCategoryConfig = () => {};
export const updateCategoryConfig = () => {};
