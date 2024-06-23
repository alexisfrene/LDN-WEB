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
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeImageCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['variation_detail', 'variations'],
      });
    },
  });

  return (
    <AlertDialog>
      {children}
      <AlertDialogTrigger className="relative">
        {edit && (
          <Icons
            type="close"
            height={20}
            className="absolute right-0 top-0 m-0.5 cursor-pointer rounded-md bg-red-600 text-slate-50 hover:bg-red-500 hover:text-slate-100"
          />
        )}
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
              mutation.mutate({
                variation_id: variationId,
                collection_id: collectionId,
                url,
              })
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
