import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import { producsCategory } from '../mocks';

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

export const filterAndMapTitles = (filterType: string): string | undefined => {
  const matchingCategory = producsCategory.find(
    (category) => category.type === filterType,
  );

  return matchingCategory?.title;
};

export const urlImageVariation = /uploads.*original/;

const localStorageUserData = localStorage.getItem('user-storage');

const parsedDataUser =
  typeof localStorageUserData === 'string'
    ? JSON?.parse(localStorageUserData || '')
    : null;

const sessionToken = parsedDataUser?.state?.session_token;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_NAME,
  headers: {
    Authorization: `Bearer ${sessionToken}`,
    'Content-Type': 'application/json',
  },
});

export const axiosInstanceFormData = axios.create({
  baseURL: import.meta.env.VITE_API_NAME,
  headers: {
    Authorization: `Bearer ${sessionToken}`,
    'Content-Type': 'multipart/form-data',
  },
});
