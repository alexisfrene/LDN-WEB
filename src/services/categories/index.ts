import { axiosInstance, axiosInstanceFormData } from '@src/lib';

export const getAllCategories = async (): Promise<Category[] | undefined> => {
  try {
    const res = await axiosInstance.get('/categories');

    if (res.data) return res.data;
  } catch (error) {
    console.log('ERROR IN CATEGORIES -->', error);
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

export const addValueCategory = async (values: any, category_id: string) => {
  try {
    const formData = new FormData();
    formData.append('value', values.value);
    formData.append('files', values.icon!);
    const res = await axiosInstanceFormData.patch(
      `/categories/${category_id}`,
      formData,
    );
    return res.data;
  } catch (error) {
    console.log('Error in addValueCategory', error);
  }
};

export const deleteCategoryConfig = () => {};
export const updateCategoryConfig = () => {};
