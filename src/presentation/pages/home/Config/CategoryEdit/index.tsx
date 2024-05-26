import React, { ReactElement, useEffect, useState } from 'react';
import { Category } from '@src/types';
import { getAllCategories } from '@src/services';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
  ScrollArea,
} from '@components';
import { FormAddCategory } from './FormAddCategory';

interface CategoryEditProps {
  showSheet: (title: string, content: ReactElement) => void;
}
export const CategoryEdit: React.FC<CategoryEditProps> = ({ showSheet }) => {
  const [category, setCategory] = useState<Category[] | []>([]);
  const getCategory = async () => {
    const res = await getAllCategories();
    if (Array.isArray(res)) return setCategory(res);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="min-w-[70vw] flex flex-col">
      {category.length === 0 ? (
        <div className="min-h-[50vh] flex justify-center">
          <div className="flex justify-center flex-col">
            <p>No tienes ninguna categoría cargada </p>
            <Icons type="cog_6_tooth" height={100} />
            <Button
              variant="default"
              onClick={() => {
                return showSheet(
                  'Agregar una categoría nueva',
                  <FormAddCategory />,
                );
              }}
            >
              Agregar una categoría nueva
            </Button>
          </div>
        </div>
      ) : (
        <>
          <ScrollArea className="h-[70vh]">
            {category.map(({ values, title, category_id }) => (
              <Card key={category_id}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <ScrollArea className="h-[13vh]">
                  <CardContent className="flex flex-row gap-5">
                    {values.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center gap-2 bg-slate-200 p-1 rounded-md"
                      >
                        <img
                          src={e.icon_url}
                          alt={e.value}
                          className="h-12 w-12 rounded-full"
                        />
                        <p className="text-lg">{e.value}</p>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 bg-green-400 p-1 rounded-md cursor-pointer hover:bg-green-500">
                      <Icons type="plus_circle" height={45} />
                    </div>
                  </CardContent>
                </ScrollArea>
              </Card>
            ))}
          </ScrollArea>
          <Button
            variant="default"
            onClick={() => {
              return showSheet(
                'Agregar una categoría nueva',
                <FormAddCategory />,
              );
            }}
          >
            Agregar una categoría nueva
          </Button>
        </>
      )}
    </div>
  );
};
