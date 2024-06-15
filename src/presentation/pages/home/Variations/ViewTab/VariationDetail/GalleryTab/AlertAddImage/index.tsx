import React, { useState } from 'react';
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
  Input,
  AspectRatio,
} from '@components';
import { addImageCollection } from '@services';

interface Props {
  label: string;
  variationId: string;
  collectionId: string;
}

export const AlertAddImage: React.FC<Props> = ({
  label,
  variationId,
  collectionId,
}) => {
  const [image, setImage] = useState<{ file: File; url: string }>();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Icons
          type="plus_circle"
          className="m-0.5 h-32 w-32 cursor-pointer rounded-md bg-emerald-400 p-3 text-emerald-100 hover:bg-emerald-500 hover:text-emerald-200"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`Agregar una imagen a : ${label}`}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setImage({
                file,
                url,
              });
            }
          }}
        />
        {image && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={image.url}
              alt="Image"
              className="m-0.5 h-32 w-32 rounded-md"
            />
          </AspectRatio>
        )}
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={async () =>
              addImageCollection(variationId, collectionId, image?.file!)
            }
            disabled={!image?.file}
          >
            Ok
          </AlertDialogAction>
          <AlertDialogCancel onClick={() => setImage(undefined)}>
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
