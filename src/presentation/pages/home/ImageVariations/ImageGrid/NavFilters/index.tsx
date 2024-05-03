import React, { useContext, useState } from 'react';
import { Button, ModalCategory } from '@components';
import { SnackbarContext } from '@presentation/context';
import { fetchProductsForCategory } from '@services';
import { filterAndMapTitles } from '@lib';
import { ImageVariantsProduct } from '@src/types';

type NavFiltersProps = {
  setState: (data: ImageVariantsProduct[]) => void;
};

export const NavFilters: React.FC<NavFiltersProps> = ({ setState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({ category: '' });
  const { showErrorSnackbar } = useContext(SnackbarContext);

  const handleFilterClick = (category: string) => {
    setFilter({ category });
  };
  const clearFilters = () => {
    setFilter({ category: '' });
  };
  const handleFilter = async () => {
    const data = await fetchProductsForCategory(filter.category);
    if (data?.length) {
      setState(data);
    } else {
      return showErrorSnackbar('No hay productos que mostrar');
    }
  };

  return (
    <div className="flex justify-start gap-10 items-center bg-amber-400 h-12 p-3 rounded-xl mb-3">
      <span>Filtrar por : </span>
      <Button onClick={() => setIsOpen(true)} variant="secondary">
        Categoría
      </Button>
      <ModalCategory
        isCategoryModalOpen={isOpen}
        handleCloseModal={() => setIsOpen(false)}
        handleFilterClick={handleFilterClick}
        filter={filter}
      />
      <Button onClick={handleFilter} variant="secondary">
        Filtrar
      </Button>
      {filter.category && (
        <>
          <p>{'Categoría :' + filterAndMapTitles(filter.category)}</p>
          <Button onClick={clearFilters} variant="destructive">
            Borrar filtros
          </Button>
        </>
      )}
    </div>
  );
};