import { axiosInstance } from '@src/lib';

export const getAllSizes = async (): Promise<Size[] | undefined> => {
  try {
    const res = await axiosInstance('/size');
    return res.data;
  } catch (error) {
    console.log('ERROR IN SIZES ALL -->', error);
  }
};

export const addSize = async (values: any) => {
  try {
    const res = await axiosInstance.post('/size', values);
    return res.data;
  } catch (error) {
    console.log('Error in addSize', error);
  }
};
