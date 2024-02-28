import React, { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  CardContent,
  CardHeader,
  CardTitle,
  Icons,
  ImageWithSkeleton,
  Input,
  LoadingIndicator,
  ScrollArea,
  Separator,
} from '@/components';
import { urlImageVariation } from '@/lib';
import { modifyCollection } from '@/services';
import { UUID, VariationsType } from '@/types';

type CollectionContentProps = {
  collection: VariationsType;
  variationId: UUID;
  handleDeleteModal: (id: UUID) => void;
  refresh: () => void;
};

export const CollectionContent: React.FC<CollectionContentProps> = ({
  collection,
  handleDeleteModal,
  variationId,
  refresh,
}) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(collection.name);
  const [images, setImages] = useState<string[]>(collection.images);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const handleIconClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const handleDeleteImage = (url: string) => {
    const skipImage = images.filter((e) => e !== url);
    setImages(skipImage);
  };
  const handleXMark = () => {
    setImages(collection.images);
    setEdit(false);
  };
  const handleSaveChange = async () => {
    const data = {
      images: images,
      name: name,
      idVariation: variationId,
      idCollection: collection.id,
    };
    setLoading(true);
    const res = await modifyCollection(data);
    if (res?.statusText === 'OK') {
      refresh();
      toast('Colección de imágenes actualizada !');
      setEdit(false);
    }
    setLoading(false);
  };
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const selectedFile = event.currentTarget.files[0];
      const fileUrl = URL.createObjectURL(selectedFile);
      setImages((prevImages) => [...prevImages, fileUrl]);
    }
  };

  return (
    <CardContent key={collection.id}>
      <LoadingIndicator isLoading={loading} />
      <CardHeader className="w-full">
        <CardTitle>
          {edit ? (
            <div className="flex justify-between">
              <Input
                placeholder={collection.name}
                className="w-96 h-8"
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex gap-2">
                <Icons
                  type="check"
                  className="h-8 text-slate-200 hover:text-slate-900 cursor-pointer bg-green-300 hover:bg-green-400 p-1"
                  onClick={handleSaveChange}
                />
                <Icons
                  type="close"
                  className="h-8 text-slate-200 hover:text-slate-900 cursor-pointer bg-red-400 hover:bg-red-500 p-1"
                  onClick={handleXMark}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              {collection.name}
              <div className="flex gap-1">
                <Icons
                  type="cog_6_tooth"
                  className="h-8 text-slate-200 hover:text-slate-900 cursor-pointer  p-1"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
                <Icons
                  type="trash"
                  className="h-8 text-slate-200 hover:text-red-500 cursor-pointer  p-1"
                  onClick={() => handleDeleteModal(collection.id)}
                />
              </div>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <ScrollArea className="mx-12 bg-slate-100 p-1 h-96">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image: string, imageIndex: number) => {
            return (
              <div
                className={`relative ${edit ? 'bg-slate-200' : 'bg-slate-100'}`}
                key={imageIndex}
              >
                {edit && (
                  <Icons
                    type="trash"
                    className="h-8 text-red-500 hover:text-red-600 hover:scale-105 cursor-pointer p-1 absolute"
                    onClick={() => handleDeleteImage(image)}
                  />
                )}
                {urlImageVariation.test(image) ? (
                  <ImageWithSkeleton
                    url={`${import.meta.env.VITE_HOST_NAME}${image}`}
                    key={imageIndex}
                  />
                ) : (
                  <ImageWithSkeleton url={image} key={imageIndex} />
                )}
              </div>
            );
          })}
          {edit && (
            <div className="col-span-1 h-60 w-60 p-14 bg-slate-200">
              <input
                type="file"
                accept="image/*"
                ref={inputFileRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
              <Icons
                type="plus_circle"
                className="text-green-300 cursor-pointer hover:text-green-400"
                onClick={handleIconClick}
              />
            </div>
          )}
        </div>
      </ScrollArea>
      <Separator className="my-4" />
    </CardContent>
  );
};
