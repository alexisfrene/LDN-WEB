import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Icons,
} from '@components';
import { ImageVariantsProduct } from '@src/types';
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
    <Card className="min-h-[84vh] flex flex-col">
      <CardHeader>
        <CardTitle>{productSelected.description?.toUpperCase()}</CardTitle>
        <CardDescription className="col-span-full">
          Imagen principal
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-6">
        <div className="col-span-2 relative">
          <Icons
            type="cog_6_tooth"
            className="text-slate-300 hover:text-slate-400 w-8 cursor-pointer absolute right-1 m-1"
          />
          <img
            src={`${import.meta.env.VITE_HOST_NAME}/${
              productSelected.primary_image
            }`}
            className="rounded-md object-contain w-full h-80  bg-slate-200"
          />
        </div>
        <div className="col-span-4 ml-3">
          <InfoDetails productSelected={productSelected} refresh={refresh} />
        </div>
      </CardContent>
    </Card>
  );
};
