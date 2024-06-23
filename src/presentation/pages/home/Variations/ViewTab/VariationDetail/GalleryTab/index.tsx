import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
  Separator,
} from '@components';
import { AlertAddImage } from './AlertAddImage';
import { AlertRemoveImage } from './AlertRemoveImage';

interface Props {
  variation: Variants;
}

export const GalleryTab: React.FC<Props> = ({ variation }) => {
  const [edit, setEdit] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{variation.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {variation.values.map((value) => (
          <div key={value.id} className="relative">
            <div className="absolute right-0">
              {edit ? (
                <Icons
                  type="close"
                  height={20}
                  className="cursor-pointer hover:text-slate-500"
                  onClick={() => setEdit(false)}
                />
              ) : (
                <Icons
                  type="cog_6_tooth"
                  height={25}
                  className="cursor-pointer hover:text-slate-500"
                  onClick={() => setEdit(true)}
                />
              )}
            </div>
            <CardDescription>{value.label}</CardDescription>
            <div className="my-1 flex flex-row flex-wrap">
              {value.images.map((image, index) => (
                <AlertRemoveImage
                  label={value.label}
                  variationId={variation.variation_id}
                  collectionId={value.id}
                  edit={edit}
                  url={image}
                  key={value.label + index}
                >
                  <img src={image} className="m-0.5 h-32 w-32 rounded-md" />
                </AlertRemoveImage>
              ))}
              {edit && (
                <AlertAddImage
                  label={value.label}
                  variationId={variation.variation_id}
                  collectionId={value.id}
                />
              )}
            </div>
            <Separator className="h-0.5 bg-slate-200" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
