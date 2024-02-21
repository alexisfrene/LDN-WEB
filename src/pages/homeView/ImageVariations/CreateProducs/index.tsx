import { useState, ChangeEvent } from 'react';
import { Formik } from 'formik';
import { useSubmit } from './useSubmit';
import { useForm } from './useForm';
import {
  Dropdown,
  Input,
  Label,
  ImageWithSkeleton,
  ModalCategory,
  Button,
} from '../../../../components';
import defaultImage from '../../../../assets/default.png';
import { useModal } from '@/hooks';
import { Filters } from '@/types';
import { filterAndMapTitles } from '@/lib';

export const CreateProducts: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [secondaryImages, setSecondaryImages] = useState<
    FileList | null | File[]
  >(null);
  const [filter, setFilter] = useState<Filters>({
    category: '',
    size: '',
  });
  const {
    hideModal: hideCategoryModal,
    isOpenModal: isCategoryModalOpen,
    showModal: showCategoryModal,
  } = useModal();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  const handleSecondaryImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSecondaryImages(files);
    }
  };
  const handleFilterClick = (
    setFieldValue: (key: string, value: string) => void,
  ) => {
    return (selectedFilter: string, filterType: string) => {
      setFilter({
        ...filter,
        [filterType]: selectedFilter,
      });
      setFieldValue('category', selectedFilter);
    };
  };
  return (
    <div className="flex justify-center">
      <Formik initialValues={useForm()} onSubmit={useSubmit()}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="mb-4 bg-white p-10 min-w-[640px]"
          >
            <Label>
              Ingresa una descripción :
              <Input
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={30}
                value={values.description}
                placeholder="Zapatillas Nike Blancas ..."
              />
            </Label>
            <Label>
              Nombre de la colección de imágenes:
              <Input
                name="collection"
                maxLength={25}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.collection}
                placeholder="Imágenes sin fondo ..."
              />
            </Label>
            <Dropdown variant="colors" />
            <Dropdown variant="genders" />
            <Dropdown variant="brands" />
            <Dropdown variant="styles" />
            <Button
              onClick={() => showCategoryModal()}
              variant="outline"
              className="my-3"
              type="button"
            >
              {filter.category.length
                ? `Categoría : ${filterAndMapTitles(
                    filter.category,
                  )?.toLocaleLowerCase()}`
                : 'Selecciona una categoría'}
            </Button>
            <div className="flex gap-3">
              <Label>Selecciona una imagen principal :</Label>
              <Input
                type="file"
                name="mainImage"
                className="w-28"
                onChange={(event) => {
                  handleImageChange(event);
                  setFieldValue('mainImage', event.currentTarget.files![0]);
                }}
                onBlur={handleBlur}
              />
              <div className="relative m-3">
                <ImageWithSkeleton url={selectedImage} className="w-40" />
                {defaultImage !== selectedImage && (
                  <button
                    onClick={() => {
                      setFieldValue('mainImage', null);
                      setSelectedImage(defaultImage);
                    }}
                    className="absolute top-0 right-0 m-1 w-6 h-6 bg-red-500 text-white rounded-sm cursor-pointer transition-transform transform hover:scale-105"
                  >
                    X
                  </button>
                )}
              </div>
            </div>
            <Label>
              Selecciona las imágenes secundarias:
              <Input
                type="file"
                name="secondaryImages"
                multiple
                onChange={(event) => {
                  handleSecondaryImageChange(event);
                  setFieldValue('secondaryImages', event.currentTarget.files);
                }}
                onBlur={handleBlur}
              />
            </Label>
            <div className="grid grid-cols-5 gap-5">
              {secondaryImages &&
                Array.from(secondaryImages).map((file, index) => {
                  const imageUrl = URL.createObjectURL(file);
                  return (
                    <div key={index} className="relative col-span-1">
                      <ImageWithSkeleton url={imageUrl} className="w-28 h-28" />
                      <button
                        onClick={() => {
                          const filesArray = Array.from(secondaryImages);
                          const newFileList = filesArray.filter(
                            (e) => e.name !== file.name,
                          );
                          setFieldValue('secondaryImages', newFileList);
                          setSecondaryImages(newFileList);
                        }}
                        className="absolute top-0 right-0 m-1 w-6 h-6 bg-red-500 text-white rounded-sm cursor-pointer transition-transform transform hover:scale-105"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
            </div>
            <ModalCategory
              isCategoryModalOpen={isCategoryModalOpen}
              handleFilterClick={handleFilterClick(setFieldValue)}
              handleCloseModal={hideCategoryModal}
              filter={filter}
            />
            <Button type="submit" className="w-full mt-3">
              Crear producto
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
