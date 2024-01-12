import { producsCategory } from '@/mocks';
import { fetchProductsForCategory, insertImageId } from '@/services';
import { ImageVariantsProduct } from '@/types';
import { ChangeEvent, useState } from 'react';

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
  const [selectedProductId, setSelectedProductId] =
    useState<ImageVariantsProduct | null>(null);

  const getProducByCategory = async (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    const res = await fetchProductsForCategory(category);

    res && setProductImages(res);
  };

  const handleCardClick = (product: ImageVariantsProduct) => {
    const productId = product.id;
    setSelectedProductId(productId === selectedProductId?.id ? null : product);
  };

  const handleInsertIdImage = async () => {
    if (productSelectedId && selectedProductId) {
      await insertImageId(productSelectedId, selectedProductId.id);
    }
  };

  return (
    <>
      <div
        className="bg-white text-2xl p-3 rounded-sm shadow-sm h-[910px] w-screen overflow-y-auto
        mr-96"
      >
        <h3 className="bg-slate-200 p-3 font-semibold">
          Selecciona las variantes de este producto:
        </h3>
        <div className="mt-1 relative">
          <select
            onChange={getProducByCategory}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleccionar...</option>
            {producsCategory.map((option) => (
              <option key={option.type} value={option.type}>
                {option.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5 10l5 5 5-5z" fillRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productImages?.map((product) => (
            <div
              key={product.id}
              className={`bg-white border p-4 rounded-md overflow-hidden cursor-pointer ${
                product.id === selectedProductId?.id
                  ? 'border-amber-600'
                  : 'border-gray-300'
              }`}
              onClick={() => handleCardClick(product)}
            >
              <h3 className="text-lg font-semibold mb-2">
                {product.description}
              </h3>
              <img
                src={`http://localhost:3001/${product.miniature_image}`}
                alt={product.description}
                className="w-full h-32 object-cover mb-2 rounded"
              />
            </div>
          ))}
        </div>
        {selectedProductId && (
          <div>
            <p>Estás por ligar las siguientes variantes:</p>
            <p>{selectedProductId.id}</p>
            {selectedProductId.variations.map((variation, index) => (
              <div key={index} className="grid grid-cols-4 gap-3">
                {variation.images.map((image, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={`http://localhost:3001/${image}`}
                    alt={image}
                    className="w-full h-32 object-cover mb-2 rounded shadow-md transition-all duration-300 transform hover:scale-105 col-span-1"
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2"
            onClick={handleInsertIdImage}
          >
            Guardar
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2"
            onClick={() => setIsOpenModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
