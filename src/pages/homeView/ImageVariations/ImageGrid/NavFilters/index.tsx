import { Button } from '@/components';
import React from 'react';

export const NavFilters = () => {
  return (
    <div className="col-span-full flex justify-start gap-10 items-center bg-amber-400 h-12 p-3 rounded-xl">
      <span>Filtrar por : </span>
      <Button onClick={() => {}} variant="secondary">
        Categoria
      </Button>
    </div>
  );
};
