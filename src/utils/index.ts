import { producsCategory } from "../mocks";

export const filterAndMapTitles = (filterType: string): string | undefined => {
  const matchingCategory = producsCategory.find(
    (category) => category.type === filterType
  );

  return matchingCategory?.title;
};
