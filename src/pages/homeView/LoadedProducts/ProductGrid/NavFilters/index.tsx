import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { filterAndMapTitles } from '../../../../../utils';
import { Button } from '../../../../../components';

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
      return <p>{'Categoria :' + filterAndMapTitles(category)}</p>;
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
    <div className="col-span-12 flex justify-start gap-10 items-center bg-amber-400 h-12 p-3 rounded-xl">
      <span>Filtrar por : </span>
      <Button onClick={onCategoryClick} variant="secondary">
        Categoria
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
      <div className="flex">
        <ChevronUpIcon
          className="h-10 cursor-pointer hover:text-slate-600"
          onClick={() => orderByPrice('+')}
        />
        <ChevronDownIcon
          className="h-10 cursor-pointer hover:text-slate-600"
          onClick={() => orderByPrice('-')}
        />
      </div>
    </div>
  );
};
