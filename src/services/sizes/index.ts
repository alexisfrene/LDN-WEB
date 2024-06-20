import { axiosInstance } from '@src/lib';
import { toast } from 'sonner';

export const getAllSizes = async () => {
  try {
    const res = await axiosInstance('/size');
    return res.data;
  } catch (error) {
    console.log('ERROR IN SIZES ALL -->', error);
  }
};

export const addSizeCollection = async (values: {
  title: string;
  values: { value: string }[];
}) => {
  try {
    const res = await axiosInstance.post('/size', values);
    return res.data;
  } catch (error) {
    console.log('Error in addSize', error);
  }
};

export const addValueSize = async ({
  value,
  size_id,
}: {
  value: string;
  size_id: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/size/${size_id}?type=add`, {
      value,
    });
    return res.data;
  } catch (error) {
    console.log('Error in addValueSize', error);
  }
};

export const modifyTitleCollectionSize = async (
  title: string,
  size_id: string,
) => {
  try {
    const res = await axiosInstance.patch(`/size/${size_id}?type=title`, {
      title,
    });
    toast('Titulo editado con éxito!');
    return res.data;
  } catch (error) {
    console.log('Error in modifyTitleCollectionSize', error);
  }
};

export const deleteValueSize = async (size_value: string, size_id: string) => {
  try {
    const res = await axiosInstance.delete(
      `/size/${size_id}?type=value&value_id=${size_value}`,
    );
    toast('Valor eliminado con éxito!');

    return res.data;
  } catch (error) {
    console.log('Error in deleteValueSize', error);
  }
};

export const deleteCollectionSize = async (size_id: string) => {
  try {
    const res = await axiosInstance.delete(`/size/${size_id}?type=collection`);
    toast('Valor eliminado con éxito!');

    return res.data;
  } catch (error) {
    console.log('Error in deleteCollectionSize', error);
  }
};
