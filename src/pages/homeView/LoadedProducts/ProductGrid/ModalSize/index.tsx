import React from 'react';
import { ModalWhite } from '../../../../../components';
import { productsSize } from '../../../../../mocks';

interface ModalSizeProps {
  isSizeModalOpen: boolean;
  handleFilterClick: (type: string, value: string) => void;
  handleCloseModal: () => void;
  filter: { size: string };
}
export const ModalSize: React.FC<ModalSizeProps> = ({
  isSizeModalOpen,
  handleFilterClick,
  handleCloseModal,
  filter,
}) => {
  const sizes = productsSize();
  return (
    <ModalWhite
      setModal={handleCloseModal}
      label="Selecciona un número/talle para filtrar:"
      isOpen={isSizeModalOpen}
    >
      {sizes.number.map((size) => (
        <div
          key={size}
          className={`${
            filter.size === size.toString() ? 'bg-amber-400' : 'bg-slate-300'
          } border-2 text-center p-2 col-span-1 cursor-pointer hover:bg-slate-400`}
          onClick={() => handleFilterClick(size.toString(), 'size')}
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
          onClick={() => handleFilterClick(size.toString(), 'size')}
        >
          {size.toString()}
        </div>
      ))}
    </ModalWhite>
  );
};
