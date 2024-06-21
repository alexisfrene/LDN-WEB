import { axiosInstance } from '@src/lib';
import axios from 'axios';
import { toast } from 'sonner';

export const registerUser = async (values: registerUserValues) => {
  try {
    values.birthday_date = new Date(values.birthday_date);
    const res = await axios.post(
      `${import.meta.env.VITE_API_NAME}/user`,
      values,
    );

    toast.success('Usuario registrado con éxito!');
    return res;
  } catch (error) {
    toast.error('Ocurrió un error al registrar el usuario');
    console.error('ERROR IN registerUser:', error);
  }
};

export const loginUser = async (values: loginUserValues) => {
  try {
    const { password, email_or_user } = values;
    const res = await axios.post(
      `${import.meta.env.VITE_API_NAME}/user/login`,
      { password, email_or_user },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    toast.success('Inicio de sesión exitoso!');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al iniciar sesión');
    console.error('ERROR IN loginUser:', error);
  }
};

export const getUrlAvatar = async () => {
  try {
    const res = await axiosInstance.get('/user/avatar');
    return res.data;
  } catch (error) {
    toast.error('Ocurrió un error al obtener la URL del avatar');
    console.error('ERROR IN getUrlAvatar:', error);
  }
};
