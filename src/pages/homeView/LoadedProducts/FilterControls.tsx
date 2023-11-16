import React from "react";
import { filterAndMapTitles } from "../../../utils";
import { producsCategory } from "../../../mocks";

interface FilterControlsProps {
  onCategoryClick: (value: boolean) => void;
  onSizeClick: (value: boolean) => void;
  onFilterSubmit: () => void;
  filter: { category: string | boolean; size: string | boolean };
  setFilter: React.Dispatch<
    React.SetStateAction<{ category: string | boolean; size: string | boolean }>
  >;
}
export const FilterControls: React.FC<FilterControlsProps> = ({
  onCategoryClick,
  onSizeClick,
  onFilterSubmit,
  filter,
  setFilter,
}) => {
  //Estos estilos se pueden simplificar
  return (
    <div className="col-span-12 flex justify-start gap-10 items-center bg-amber-200 h-12 px-3">
      <span>Filtrar por : </span>

      <div
        className="bg-amber-500 hover:bg-amber-400 hover:text-slate-600 cursor-pointer p-3 rounded-lg shadow-lg"
        onClick={() => onCategoryClick(true)}
      >
        Categoria
      </div>
      <div
        className="bg-amber-500 hover:bg-amber-400 hover:text-slate-600 cursor-pointer py-3 px-6 rounded-lg shadow-lg"
        onClick={() => onSizeClick(true)}
      >
        Talle
      </div>
      <div
        className="bg-white hover:bg-slate-200 hover:text-slate-600 cursor-pointer py-3 px-6 rounded-lg shadow-lg"
        onClick={() => onFilterSubmit()}
      >
        Filtrar
      </div>
      {filter.category && (
        <p>
          {"Categoria :" + filterAndMapTitles(filter.category, producsCategory)}
        </p>
      )}
      {filter.size && <p>{"Numero/Talle :" + filter.size}</p>}
      {(filter.category || filter.size) && (
        <div
          className="bg-white hover:bg-slate-200 hover:text-slate-600 cursor-pointer py-3 px-6 rounded-lg shadow-lg"
          onClick={() => {
            setFilter({ category: false, size: false });
          }}
        >
          Borrar filtros
        </div>
      )}
    </div>
  );
};
