import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { filterAndMapTitles } from '../../../utils';
import { PrimaryButton } from '../../../components';

interface FilterControlsProps {
  onCategoryClick: (value: boolean) => void;
  onSizeClick: (value: boolean) => void;
  onFilterSubmit: () => void;
  filter: { category: string; size: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ category: string; size: string }>
  >;
  orderByPrice: (direction: '+' | '-') => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
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

  const buttonStyle = 'bg-white hover:bg-slate-200 text-slate-900';
  return (
    <div className="col-span-12 flex justify-start gap-10 items-center bg-amber-400 h-12 p-3 rounded-xl">
      <span>Filtrar por : </span>
      <PrimaryButton onClick={() => onCategoryClick(true)} label="Categoria" />
      <PrimaryButton onClick={() => onSizeClick(true)} label="Talle" />
      <PrimaryButton
        onClick={() => onFilterSubmit()}
        label="Filtrar"
        additionalClasses={buttonStyle}
      />
      {renderCategoryInfo()}
      {renderSizeInfo()}
      {(category || size) && (
        <PrimaryButton
          onClick={clearFilters}
          label="Borrar filtros"
          additionalClasses={buttonStyle}
        />
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
