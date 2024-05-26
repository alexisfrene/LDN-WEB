import React, { ReactElement, useEffect, useState } from 'react';
import { Category } from '@src/types';
import { getAllCategories } from '@src/services';
import { FormAddCategory } from './FormAddCategory';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
  Input,
  Label,
  ScrollArea,
} from '@components';

interface CategoryEditProps {
  showSheet: (title: string, content: ReactElement) => void;
}
export const CategoryEdit: React.FC<CategoryEditProps> = ({ showSheet }) => {
  const [selected, setSelected] = useState<string>();
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
          <ScrollArea className="h-[70vh] px-2">
            {category.map(({ values, title, category_id }) => (
              <Card key={category_id}>
                <CardHeader className="relative">
                  {selected === category_id ? (
                    <>
                      <Label>Nombre de la colección </Label>
                      <Input placeholder={title} />
                    </>
                  ) : (
                    <CardTitle>{title}</CardTitle>
                  )}

                  {selected === category_id ? (
                    <Icons
                      type="check"
                      height={23}
                      className="absolute right-0 top-0 cursor-pointer mx-1 bg-green-400 text-white"
                      onClick={() => setSelected('')}
                    />
                  ) : (
                    <div className="absolute right-0 top-0 flex flex-row">
                      <Icons
                        type="copy_manual"
                        height={25}
                        className=" cursor-pointer rounded-tr-sm  text-slate-300 hover:text-slate-900"
                        onClick={() => {
                          setSelected(category_id);
                        }}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Icons
                            type="trash"
                            height={25}
                            className=" cursor-pointer rounded-tr-sm text-slate-300 hover:text-red-600"
                          />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {`Estas seguro de  eliminar esto, (${title.toUpperCase()})?`}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción es permanente se perderán los datos y
                              las imágenes asociadas a la misma!
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex flex-row gap-5 flex-wrap">
                  {values.map((e) => (
                    <Badge key={e.id} variant="secondary" className="relative">
                      <Avatar>
                        <AvatarImage src={e.icon_url} alt="@ldn" />
                        <AvatarFallback>{e.value[0]}</AvatarFallback>
                      </Avatar>
                      {e.value}
                      {category_id === selected && (
                        <Icons
                          type="close"
                          height={15}
                          className="absolute right-0 top-0 bg-red-500 hover:bg-red-400 cursor-pointer rounded-tr-sm"
                        />
                      )}
                    </Badge>
                  ))}
                  {category_id === selected && (
                    <Badge
                      className="bg-green-400 cursor-pointer hover:bg-green-500"
                      onClick={() => {
                        return showSheet(
                          'Agregar una categoría nueva',
                          <FormAddCategory
                            type="value"
                            category_id={category_id}
                          />,
                        );
                      }}
                    >
                      <Icons type="plus_circle" height={35} />
                    </Badge>
                  )}
                </CardContent>
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
