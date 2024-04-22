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
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components';
import { producsCategory } from '@presentation/mocks';
import { fetchProductsForCategory, insertImageId } from '@src/services';
import { ImageVariantsProduct } from '@src/types';
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
                {producsCategory.map((option) => (
                  <SelectItem key={option.type} value={option.type}>
                    {option.title}
                  </SelectItem>
                ))}
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
                className={`bg-white border p-4 rounded-md overflow-hidden cursor-pointer ${
                  product.id === selectedProductId?.id
                    ? 'border-amber-600'
                    : 'border-gray-300'
                }`}
                onClick={() => handleCardClick(product)}
              >
                <h3 className="text-sm font-semibold mb-1 h-10 truncate">
                  {product.description}
                </h3>
                <img
                  src={`${import.meta.env.VITE_HOST_NAME}/${
                    product.miniature_image
                  }`}
                  alt={product.description}
                  className="object-fill mb-2 rounded"
                />
              </div>
            ))
          ) : (
            <p className="col-span-6 text-center flex flex-col items-center justify-center h-[73vh] text-2xl text-slate-300 mr-20 mb-20">
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
            <ScrollArea className="h-[20.5vh] bg-slate-200 p-5 rounded-sm">
              {selectedProductId?.variations.map((variation, index) => (
                <div key={index} className="grid grid-cols-6 gap-5">
                  {variation.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={`${import.meta.env.VITE_HOST_NAME}/${image}`}
                      alt={image}
                      className="w-full h-32 object-cover mb-2 rounded shadow-md transition-all duration-300 transform hover:scale-105 col-span-1"
                    />
                  ))}
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        <div className="w-full flex justify-center gap-16 flex-1 mt-2">
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
