import React from "react";
import { filterAndMapTitles } from "../../../utils";
import { producsCategory } from "../../../mocks";

interface CategoryFilterModalProps {
  setModalCategory: React.Dispatch<React.SetStateAction<boolean>>;
  filter: { category: string | boolean; size: string | boolean };
  setFilter: React.Dispatch<
    React.SetStateAction<{ category: string | boolean; size: string | boolean }>
  >;
}

export const CategoryFilterModal: React.FC<CategoryFilterModalProps> = ({
  setModalCategory,
  filter,
  setFilter,
}) => {
  return (
    <div className="bg-white grid grid-cols-4 p-3 gap-2">
      <h3 className="col-span-4 mb-3 text-xl font-semibold">
        Selecciona una categoría para filtrar:
      </h3>
      {producsCategory.map((category) => (
        <div
          key={category.type}
          className="bg-slate-300 border-2 text-center p-2 col-span-1 cursor-pointer hover:bg-slate-400"
          onClick={() =>
            setFilter({ category: category.type, size: filter.size })
          }
        >
          {filterAndMapTitles(category.type, producsCategory)}
        </div>
      ))}
      <div className="col-span-4 mt-3">
        <button
          className="bg-green-400 w-1/2 h-10 hover:bg-green-500"
          onClick={() => setModalCategory(false)}
        >
          Aceptar
        </button>
        <button
          className="bg-red-500 w-1/2 h-10 hover:bg-red-600"
          onClick={() => setModalCategory(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
