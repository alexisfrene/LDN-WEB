export const filterAndMapTitles = (
  filterType: string | boolean,
  producsCategory: any
): string | undefined => {
  const matchingCategory = producsCategory.find(
    (category) => category.type === filterType
  );

  return matchingCategory?.title;
};
