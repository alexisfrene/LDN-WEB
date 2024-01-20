import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
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
