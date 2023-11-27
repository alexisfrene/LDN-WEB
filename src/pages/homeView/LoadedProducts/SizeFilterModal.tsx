import React from 'react';
import { PrimaryButton } from '../../../components';

interface SizeFilterModalProps {
  sizes: { number: number[]; letter: string[] };
  filter: { category: string; size: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ category: string; size: string }>
  >;
  setModalSize: React.Dispatch<React.SetStateAction<boolean>>;
}

const SizeFilterModal: React.FC<SizeFilterModalProps> = ({
  sizes,
  setFilter,
  filter,
  setModalSize,
}) => {
  return (
    <div className="bg-white grid grid-cols-12 p-3 gap-2">
      <h3 className="col-span-12 mb-3 text-xl font-semibold">
        Selecciona un número para filtrar:
      </h3>
      {sizes.number.map((size) => (
        <div
          key={size}
          className={`${
            filter.size === size.toString() ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 col-span-1 cursor-pointer hover:bg-slate-400`}
          onClick={() =>
            setFilter({
              category: filter.category,
              size: size.toString(),
            })
          }
        >
          {size.toString()}
        </div>
      ))}
      <h3 className="col-span-12 mb-3 text-xl font-semibold">
        Selecciona un talle para filtrar:
      </h3>
      {sizes.letter.map((size) => (
        <div
          key={size}
          className={`${
            filter.size === size.toString() ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 col-span-1 cursor-pointer hover:bg-slate-400`}
          onClick={() =>
            setFilter({
              category: filter.category,
              size: size.toString(),
            })
          }
        >
          {size.toString()}
        </div>
      ))}
      <div className="col-span-12 mt-3 font-medium flex justify-evenly">
        <PrimaryButton
          onClick={() => setModalSize(false)}
          label="Aceptar"
          additionalClasses="bg-green-400 hover:bg-green-500"
        />
        <PrimaryButton
          onClick={() => setModalSize(false)}
          label="Cancelar"
          additionalClasses="bg-red-500 hover:bg-red-600"
        />
      </div>
    </div>
  );
};

export { SizeFilterModal };
