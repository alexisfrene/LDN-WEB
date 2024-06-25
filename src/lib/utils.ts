import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

const getToken = () => {
  const localStorageUserData = localStorage.getItem('user-storage');
  const parsedDataUser =
    typeof localStorageUserData === 'string'
      ? JSON?.parse(localStorageUserData || '')
      : null;
  return parsedDataUser?.state?.session_token || '';
};

const axiosInstanceCreate = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_NAME,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosInstanceFormDataCreate = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_NAME,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = axiosInstanceCreate();

export const axiosInstanceFormData = axiosInstanceFormDataCreate();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentFormattedDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + currentDate.getDate()).slice(-2);
  const formattedDate = year + '-' + month + '-' + day;

  return formattedDate;
};

export const removeEmptyStringProperties = (obj: Product): Product => {
  const cleanedObject: Partial<Product> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (
      (typeof value === 'string' && value.trim() !== '') ||
      typeof value !== 'string'
    ) {
      cleanedObject[key as keyof Product] = value;
    }
  }

  return cleanedObject as Product;
};

export const fetchImage = async (url: string) => {
  const response = await axios.get(url, { responseType: 'blob' });
  return URL.createObjectURL(response.data);
};
