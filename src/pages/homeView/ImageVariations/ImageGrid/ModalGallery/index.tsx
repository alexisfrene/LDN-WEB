import { Modal } from '../../../../../components';
import { ImageVariantsProduct } from '../../../../../types';

interface ModalGalleryProps {
  isGalleryModalOpen: boolean;
  hideGalleryModal: () => void;
  productSelected: ImageVariantsProduct | null;
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({
  isGalleryModalOpen,
  hideGalleryModal,
  productSelected,
}) => {
  return (
    <Modal isOpen={isGalleryModalOpen} onRequestClose={hideGalleryModal}>
      <div className="bg-amber-600 flex flex-col rounded shadow-lg overflow-y-auto">
        <button
          onClick={hideGalleryModal}
          className="absolute top-0 right-0 bg-white hover:bg-slate-200 font-bold h-9 w-9 transition-all duration-300"
        >
          X
        </button>
        <h2 className="text-2xl mb-4 text-center bg-amber-700 text-white rounded transition-all duration-300 h-9">
          {productSelected?.description?.toUpperCase()}
        </h2>

        {productSelected?.variations?.map((variation, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 mb-4 transition-all duration-300 px-5"
          >
            <h3 className="col-span-12 text-lg font-bold text-white transition-all duration-300">
              {variation.name}
            </h3>
            {variation.images.map((image: string, imageIndex: number) => (
              <img
                key={imageIndex}
                src={`http://localhost:3001/${image}`}
                loading="lazy"
                alt={`Image ${imageIndex + 1}`}
                className="object-contain col-span-4 w-56 h-56 rounded-md transition-all duration-300 bg-amber-500"
              />
            ))}
          </div>
        ))}
      </div>
    </Modal>
  );
};
