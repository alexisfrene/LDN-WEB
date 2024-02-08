import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid';
import {
  CardContent,
  CardHeader,
  CardTitle,
  ImageWithSkeleton,
  Input,
  ScrollArea,
  Separator,
} from '@/components';
import { UUID } from '@/types';

type CollectionContentProps = {
  index: number;
  variation: { name: string; id: UUID; images: [] };
  handleDeleteModal: (id: UUID) => void;
};

export const CollectionContent: React.FC<CollectionContentProps> = ({
  index,
  variation,
  handleDeleteModal,
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <CardContent key={index}>
      <CardHeader className="w-full">
        <CardTitle>
          {edit ? (
            <div className="flex justify-between">
              <Input placeholder={variation.name} className="w-96 h-8" />
              <div className="flex gap-2">
                <CheckIcon className="h-8 text-slate-200 hover:text-slate-900 cursor-pointer bg-green-300 p-1" />
                <XMarkIcon
                  className="h-8 text-slate-200 hover:text-slate-900 cursor-pointer bg-red-500 p-1"
                  onClick={() => setEdit(false)}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              {variation.name}
              <div className="flex gap-1">
                <Cog6ToothIcon
                  className="h-8 text-slate-200 hover:text-slate-900 cursor-pointer  p-1"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
                <TrashIcon
                  className="h-8 text-slate-200 hover:text-red-500 cursor-pointer  p-1"
                  onClick={() => handleDeleteModal(variation.id)}
                />
              </div>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <ScrollArea className="mx-12 bg-slate-100 p-1 h-96">
        <div className="grid grid-cols-4 gap-6">
          {variation.images?.map((image: string, imageIndex: number) => (
            <div
              className={`relative ${edit ? 'bg-slate-200' : 'bg-slate-100'}`}
            >
              {edit && (
                <TrashIcon
                  className="h-8 text-red-500 hover:text-red-700 cursor-pointer p-1 absolute"
                  onClick={() => handleDeleteModal(variation.id)}
                />
              )}
              <ImageWithSkeleton
                url={`http://localhost:3001/${image}`}
                key={imageIndex}
              />
            </div>
          ))}
          {edit && (
            <div className="col-span-1 h-60 w-60 p-14 bg-slate-200">
              <PlusCircleIcon className="text-green-300 cursor-pointer hover:text-green-400" />
            </div>
          )}
        </div>
      </ScrollArea>
      <Separator className="my-4" />
    </CardContent>
  );
};
