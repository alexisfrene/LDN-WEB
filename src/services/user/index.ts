import { axiosInstance } from '@src/lib';
import axios from 'axios';

export const registerUser = async (values: registerUserValues) => {
  try {
    values.birthday_date = new Date(values.birthday_date);
    const res = await axios.post(
      `${import.meta.env.VITE_API_NAME}/user`,
      values,
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (values: loginUserValues) => {
  try {
    const { password, email_or_user } = values;
    const res = await axios.post(
      `${import.meta.env.VITE_API_NAME}/user/login`,
      { password, email_or_user },
    );

    return res.data;
  } catch (error) {
    console.log(error);
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
