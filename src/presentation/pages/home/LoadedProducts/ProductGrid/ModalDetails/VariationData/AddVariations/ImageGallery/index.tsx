import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icons,
  LoadingIndicator,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components';
import { fetchProductsForCategory, insertImageId } from '@services';
import { useState } from 'react';

interface ImageGalleryProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
  productSelectedId: string | null;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  setIsOpenModal,
  productSelectedId,
}) => {
  const [productImages, setProductImages] = useState<ImageVariantsProduct[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] =
    useState<ImageVariantsProduct | null>(null);

  const getProducByCategory = async (category: string) => {
    setLoading(true);
    const res = await fetchProductsForCategory(category);
    res && setProductImages(res);
    setLoading(false);
  };

  const handleCardClick = (product: ImageVariantsProduct) => {
    const productId = product.id;
    setSelectedProductId(productId === selectedProductId?.id ? null : product);
  };

  const handleInsertIdImage = async () => {
    if (productSelectedId && selectedProductId) {
      setLoading(true);
      const res = await insertImageId(productSelectedId, selectedProductId.id);
      res && setIsOpenModal(false);
      setLoading(false);
    }
  };

  return (
    <Card className="mx-20 my-5 h-[92vh]">
      <CardHeader>
        <CardTitle> Selecciona las variantes de este producto:</CardTitle>
        <CardDescription>
          <Select onValueChange={getProducByCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent className="text-xl">
              <SelectGroup>
                <SelectLabel>Categorías</SelectLabel>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardDescription>
      </CardHeader>
      <ScrollArea className={selectedProductId ? 'h-[50vh]' : 'h-[73vh]'}>
        <CardContent className="grid grid-cols-6 gap-2">
          {productImages.length ? (
            productImages?.map((product) => (
              <div
                key={product.id}
                className={`cursor-pointer overflow-hidden rounded-md border bg-white p-4 ${
                  product.id === selectedProductId?.id
                    ? 'border-amber-600'
                    : 'border-gray-300'
                }`}
                onClick={() => handleCardClick(product)}
              >
                <h3 className="mb-1 h-10 truncate text-sm font-semibold">
                  {product.description}
                </h3>
                <img
                  src={`${import.meta.env.VITE_HOST_NAME}/${
                    product.miniature_image
                  }`}
                  alt={product.description}
                  className="mb-2 rounded object-fill"
                />
              </div>
            ))
          ) : (
            <p className="col-span-6 mb-20 mr-20 flex h-[73vh] flex-col items-center justify-center text-center text-2xl text-slate-300">
              Selecciona una categoría !!!
              <Icons type="warning" width={96} className="m-5" />
            </p>
          )}
        </CardContent>
      </ScrollArea>
      <CardFooter className="flex flex-col">
        {selectedProductId && (
          <div>
            <p hidden={!selectedProductId}>
              Estás por ligar las siguientes variantes:
            </p>
            <ScrollArea className="h-[20.5vh] rounded-sm bg-slate-200 p-5">
              {selectedProductId?.variations.map((variation, index) => (
                <div key={index} className="grid grid-cols-6 gap-5">
                  {variation.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={`${import.meta.env.VITE_HOST_NAME}/${image}`}
                      alt={image}
                      className="col-span-1 mb-2 h-32 w-full transform rounded object-cover shadow-md transition-all duration-300 hover:scale-105"
                    />
                  ))}
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        <div className="mt-2 flex w-full flex-1 justify-center gap-16">
          <Button onClick={handleInsertIdImage}> Guardar</Button>
          <Button onClick={() => setIsOpenModal(false)} variant="destructive">
            Cancelar
          </Button>
        </div>
      </CardFooter>
      <LoadingIndicator isLoading={loading} />
    </Card>
  );
};
