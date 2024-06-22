import React, { ReactElement, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteCollectionCategory,
  deleteValueCategory,
  getAllCategories,
  modifyTitleCollectionCategory,
} from '@src/services';
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
  LoadingIndicator,
  ScrollArea,
} from '@components';

interface CategoryEditProps {
  showSheet: (title: string, content: ReactElement) => void;
}

export const CategoryEdit: React.FC<CategoryEditProps> = ({ showSheet }) => {
  const [selected, setSelected] = useState<string>();
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  const mutation = useMutation({
    mutationFn: deleteCollectionCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="flex min-w-[70vw] flex-col">
      {data.length === 0 ? (
        <div className="flex min-h-[50vh] justify-center">
          <div className="flex flex-col justify-center">
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
            {data.map(({ values, title, category_id }) => (
              <Card key={category_id}>
                <CardHeader className="relative">
                  {selected === category_id ? (
                    <>
                      <Label className="w-full">Nombre de la colección </Label>
                      <div className="flex">
                        <Input
                          placeholder={title}
                          onChange={(e) => setCollectionTitle(e.target.value)}
                        />
                        <Button
                          className="cursor-pointer rounded-md bg-green-400 hover:bg-green-500"
                          disabled={
                            title === collectionTitle ||
                            collectionTitle.length === 0
                          }
                          onClick={async () => {
                            await modifyTitleCollectionCategory(
                              collectionTitle,
                              category_id,
                            );
                          }}
                        >
                          <Icons type="check" className="h-8" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <CardTitle className="my-5">{title}</CardTitle>
                  )}
                  {selected === category_id ? (
                    <Icons
                      type="close"
                      height={20}
                      className="absolute right-0 top-0 mx-1 cursor-pointer text-slate-500 hover:text-slate-600"
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
                            <AlertDialogAction
                              onClick={() => {
                                mutation.mutate(category_id);
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex flex-row flex-wrap gap-5">
                  {values.map((e) => (
                    <Badge key={e.id} variant="secondary" className="relative">
                      <Avatar>
                        <AvatarImage src={e.icon_url} alt="@ldn" />
                        <AvatarFallback>{e.value[0]}</AvatarFallback>
                      </Avatar>
                      {e.value}
                      {category_id === selected && (
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Icons
                              type="close"
                              height={15}
                              className="absolute right-0 top-0 cursor-pointer rounded-tr-sm bg-red-500 hover:bg-red-400"
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {`Estas seguro de  eliminar ${e.value.toUpperCase()} ?`}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción es permanente se perderán los datos
                                y las imágenes asociadas a la misma!
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  await deleteValueCategory(e.id, category_id);
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </Badge>
                  ))}
                  {category_id === selected && (
                    <Badge
                      className="cursor-pointer bg-green-400 hover:bg-green-500"
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