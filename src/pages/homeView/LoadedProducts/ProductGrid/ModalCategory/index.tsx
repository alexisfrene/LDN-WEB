import React from 'react';
import { ModalWhite } from '../../../../../components';
import { producsCategory } from '../../../../../mocks';
import { filterAndMapTitles } from '../../../../../utils';

interface ModalCategoryProps {
  isCategoryModalOpen: boolean;
  handleFilterClick: (type: string, value: string) => void;
  handleCloseModal: () => void;
  filter: { category: string };
}

export const ModalCategory: React.FC<ModalCategoryProps> = ({
  isCategoryModalOpen,
  handleFilterClick,
  handleCloseModal,
  filter,
}) => {
  return (
    <ModalWhite
      setModal={handleCloseModal}
      label="Selecciona una categoría para filtrar:"
      isOpen={isCategoryModalOpen}
    >
      {producsCategory.map((category) => (
        <div
          key={category.type}
          className={`${
            filter.category === category.type ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 col-span-2 cursor-pointer hover:bg-slate-400`}
          onClick={() => handleFilterClick(category.type, 'category')}
        >
          {filterAndMapTitles(category.type)}
        </div>
      ))}
    </ModalWhite>
  );
};
