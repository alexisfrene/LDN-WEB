import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
} from '@components';
import { InfoDetails } from './InfoDetails';

type InfoImagesProps = {
  refresh: () => void;
  productSelected: ImageVariantsProduct;
};

export const InfoImages: React.FC<InfoImagesProps> = ({
  productSelected,
  refresh,
}) => {
  return (
    <Card className="flex min-h-[84vh] flex-col">
      <CardHeader>
        <CardTitle>{productSelected.description?.toUpperCase()}</CardTitle>
        <CardDescription className="col-span-full">
          Imagen principal
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-6">
        <div className="relative col-span-2">
          <Icons
            type="cog_6_tooth"
            className="absolute right-1 m-1 w-8 cursor-pointer text-slate-300 hover:text-slate-400"
          />
          <img
            src={`${import.meta.env.VITE_HOST_NAME}/${
              productSelected.primary_image
            }`}
            className="h-80 w-full rounded-md bg-slate-200  object-contain"
          />
        </div>
        <div className="col-span-4 ml-3">
          <InfoDetails productSelected={productSelected} refresh={refresh} />
        </div>
      </CardContent>
    </Card>
  );
};
