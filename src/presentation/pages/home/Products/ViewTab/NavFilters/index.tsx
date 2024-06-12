import { filterAndMapTitles } from '@lib';
import { Button, Icons } from '@components';

interface NavFiltersProps {
  onCategoryClick: () => void;
  onSizeClick: () => void;
  onFilterSubmit: () => void;
  filter: { category: string; size: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ category: string; size: string }>
  >;
  orderByPrice: (direction: '+' | '-') => void;
}

export const NavFilters: React.FC<NavFiltersProps> = ({
  onCategoryClick,
  onSizeClick,
  onFilterSubmit,
  filter: { category, size },
  setFilter,
  orderByPrice,
}) => {
  const renderCategoryInfo = () => {
    if (category) {
      return <p>{'Categoría :' + filterAndMapTitles(category)}</p>;
    }
    return null;
  };
  const renderSizeInfo = () => {
    if (size) {
      return <p>{'Numero/Talle :' + size}</p>;
    }
    return null;
  };
  const clearFilters = () => {
    setFilter({ category: '', size: '' });
  };

  return (
    <div className="col-span-full flex h-12 items-center justify-start gap-10 rounded-xl bg-amber-400 p-3">
      <span>Filtrar por : </span>
      <Button onClick={onCategoryClick} variant="secondary">
        Categoría
      </Button>
      <Button onClick={onSizeClick} variant="secondary">
        Talle
      </Button>
      <Button onClick={() => onFilterSubmit()} variant="secondary">
        Filtrar
      </Button>
      {renderCategoryInfo()}
      {renderSizeInfo()}
      {(category || size) && (
        <Button onClick={clearFilters} variant="destructive">
          Borrar filtros
        </Button>
      )}
      <div className="flex gap-5">
        <Icons
          type="arrow_top"
          className="h-8 cursor-pointer hover:text-slate-600"
          onClick={() => orderByPrice('+')}
        />
        <Icons
          type="arrow_down"
          className="h-8 cursor-pointer hover:text-slate-600"
          onClick={() => orderByPrice('-')}
        />
      </div>
    </div>
  );
};
