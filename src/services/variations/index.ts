import { axiosInstance } from '@src/lib';

export const getAllVariations = async () => {
  try {
    const res = await axiosInstance('/variations');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
