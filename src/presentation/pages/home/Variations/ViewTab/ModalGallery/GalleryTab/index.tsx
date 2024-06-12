import { Separator } from '@radix-ui/react-separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@src/presentation/components';
import React from 'react';

interface Props {
  variation: Variants;
}

export const GalleryTab: React.FC<Props> = ({ variation }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{variation.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {variation.values.map((value) => (
          <div key={value.id}>
            <CardDescription>{value.label}</CardDescription>
            <div className="my-1 flex flex-row">
              {value.images.map((image, index) => (
                <img
                  src={image}
                  className="m-0.5 h-32 w-32 rounded-md"
                  key={value.label + index}
                />
              ))}
            </div>
            <Separator className="h-0.5 bg-slate-200" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
