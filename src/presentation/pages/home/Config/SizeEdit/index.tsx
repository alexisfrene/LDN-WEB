import React, { ReactElement, useEffect, useState } from 'react';
import {
  deleteCollectionSize,
  deleteValueSize,
  modifyTitleCollectionSize,
} from '@src/services';
import { FormAddSize } from './FormAddSize';
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
import { useSizesStore } from '@global';

interface SizeEditProps {
  showSheet: (title: string, content: ReactElement) => void;
}

export const SizeEdit: React.FC<SizeEditProps> = ({ showSheet }) => {
  const [selected, setSelected] = useState<string>();
  const [collectionTitle, setCollectionTitle] = useState<string>('');
  const sizes = useSizesStore((state) => state.sizes);
  const refreshSizes = useSizesStore((state) => state.refreshSizes);
  useEffect(() => {
    refreshSizes();
  }, [sizes, refreshSizes]);
  return (
    <div className="flex min-w-[70vw] flex-col">
      {sizes.length === 0 ? (
        <div className="flex min-h-[50vh] justify-center">
          <div className="flex flex-col justify-center">
            <p>No tienes ningún numero / talla cargada </p>
            <Icons type="cog_6_tooth" height={100} />
            <Button
              variant="default"
              onClick={() => {
                return showSheet(
                  'Agregar un numero / talla nueva',
                  <FormAddSize />,
                );
              }}
            >
              Agregar un numero / talla nueva
            </Button>
          </div>
        </div>
      ) : (
        <>
          <ScrollArea className="h-[70vh] px-2">
            {sizes.map(({ values, title, size_id }) => (
              <Card key={size_id}>
                <CardHeader className="relative">
                  {selected === size_id ? (
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
                            await modifyTitleCollectionSize(
                              collectionTitle,
                              size_id,
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
                  {selected === size_id ? (
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
                          setSelected(size_id);
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
                              onClick={async () => {
                                await deleteCollectionSize(size_id);
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
                      {e.value}
                      {size_id === selected && (
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
                                  await deleteValueSize(e.id, size_id);
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
                  {size_id === selected && (
                    <Badge
                      className="cursor-pointer bg-green-400 hover:bg-green-500"
                      onClick={() => {
                        return showSheet(
                          'Agregar un numero / talla nueva',
                          <FormAddSize type="value" size_id={size_id} />,
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
                'Agregar un numero / talla nueva',
                <FormAddSize />,
              );
            }}
          >
            Agregar un numero / talla nueva
          </Button>
        </>
      )}
    </div>
  );
};
