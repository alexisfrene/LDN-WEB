import React from 'react';
import { filterAndMapTitles } from '../../../utils';
import { producsCategory } from '../../../mocks';
import { PrimaryButton } from '../../../components';

interface CategoryFilterModalProps {
  setModalCategory: React.Dispatch<React.SetStateAction<boolean>>;
  filter: { category: string | boolean; size: string | boolean };
  setFilter: React.Dispatch<
    React.SetStateAction<{ category: string; size: string }>
  >;
}

export const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  setModalCategory,
  filter,
  setFilter,
}) => {
  return (
    <div className="bg-white grid grid-cols-4 p-3 gap-2 rounded-lg">
      <h3 className="col-span-4 mb-3 text-xl font-semibold">
        Selecciona una categoría para filtrar:
      </h3>
      {producsCategory.map((category) => (
        <div
          key={category.type}
          className={`${
            filter.category === category.type ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 col-span-1 cursor-pointer hover:bg-slate-400`}
          onClick={() =>
            setFilter({ category: category.type, size: filter.size.toString() })
          }
        >
          {filterAndMapTitles(category.type)}
        </div>
      ))}
      <div className="col-span-4 mt-3 font-medium flex justify-evenly">
        <PrimaryButton
          onClick={() => setModalCategory(false)}
          label="Aceptar"
          additionalClasses="bg-green-400 hover:bg-green-500"
        />
        <PrimaryButton
          onClick={() => setModalCategory(false)}
          label="Cancelar"
          additionalClasses="bg-red-500 hover:bg-red-600"
        />
      </div>
    </div>
  );
};
