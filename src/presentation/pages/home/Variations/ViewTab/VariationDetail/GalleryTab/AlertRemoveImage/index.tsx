import React, { ReactNode } from 'react';
import {
  Icons,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AspectRatio,
} from '@components';
import { removeImageCollection } from '@services';

interface Props {
  label: string;
  variationId: string;
  collectionId: string;
  children: ReactNode;
  edit: boolean;
  url: string;
}

export const AlertRemoveImage: React.FC<Props> = ({
  label,
  variationId,
  collectionId,
  children,
  edit,
  url,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="relative">
        {edit && (
          <Icons
            type="close"
            height={20}
            className="absolute right-0 m-0.5 cursor-pointer rounded-md bg-red-600 text-slate-50 hover:bg-red-500 hover:text-slate-100"
          />
        )}
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Eliminar esta imagen de : ${label}`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        {url && (
          <AspectRatio ratio={16 / 9}>
            <img src={url} alt="Image" className="m-0.5 h-32 w-32 rounded-md" />
          </AspectRatio>
        )}

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () =>
              removeImageCollection(variationId, collectionId, url)
            }
          >
            Ok
          </AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
