import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Icons } from '@src/presentation/components';
import { getAllSizes } from '@src/services';
import { FormAddSize } from './FormAddSize';
interface SizeEditProps {
  showSheet: (title: string, content: ReactElement) => void;
}
export const SizeEdit: React.FC<SizeEditProps> = ({ showSheet }) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const getSizes = async () => {
    const res = await getAllSizes();
    if (res) setSizes(res);
  };
  useEffect(() => {
    getSizes();
  }, []);
  return (
    <div>
      {sizes.length === 0 ? (
        <div className="flex min-h-[50vh] justify-center">
          <div className="flex flex-col justify-center">
            <p>No tienes ninguna categoría cargada </p>
            <Icons type="cog_6_tooth" height={100} />
            <Button
              variant="default"
              onClick={() => {
                return showSheet(
                  'Agregar una categoría nueva',
                  <FormAddSize />,
                );
              }}
            >
              Agregar una categoría nueva
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {sizes.map((e) => (
            <div key={e.size_id}>
              <p>{e.title}</p>
              {e.values.map((e) => (
                <p key={e.id}>{e.value}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
