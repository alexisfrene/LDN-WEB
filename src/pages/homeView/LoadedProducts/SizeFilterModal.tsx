interface SizeFilterModalProps {
  sizes: { number: number[]; letter: string[] };
  filter: { category: string | boolean; size: string | boolean };
  setFilter: React.Dispatch<
    React.SetStateAction<{ category: string | boolean; size: string | boolean }>
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
          className="bg-slate-300 border-2 text-center p-2 col-span-1 cursor-pointer hover:bg-slate-400"
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
          className="bg-slate-300 border-2 text-center p-2 col-span-1 cursor-pointer hover:bg-slate-400"
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
      <div className="col-span-12 mt-3">
        <button
          className="bg-green-400 w-1/2 h-10 hover:bg-green-500"
          onClick={() => setModalSize(false)}
        >
          Aceptar
        </button>
        <button
          className="bg-red-500 w-1/2 h-10 hover:bg-red-600"
          onClick={() => setModalSize(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export { SizeFilterModal };
