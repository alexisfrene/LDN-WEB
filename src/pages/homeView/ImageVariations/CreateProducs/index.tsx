import { useState, ChangeEvent } from 'react';
import { Formik } from 'formik';
import { useSubmit } from './useSubmit';
import { useForm } from './useForm';
import { Dropdown, Input, Label,ImageWithSkeleton, ModalCategory, Button } from '../../../../components';
import defaultImage from '../../../../assets/default.png';
import { useModal } from '@/hooks';
import { Filters } from '@/types';

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
  const handleFilterClick = (selectedFilter: string, filterType: string) => {
    setFilter({
      ...filter,
      [filterType]: selectedFilter,
    });
  };
  return (
    <div className="flex justify-center">
      <Formik initialValues={useForm()} onSubmit={(e) => console.log(e)}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="mb-4 bg-white p-10"
          >
            <div className="h-96 overflow-y-auto overflow-x-hidden">
              {selectedImage && (
                <div className="relative h-80 m-3">
                  <ImageWithSkeleton url={selectedImage} />
                  {defaultImage !== selectedImage && (
                    <button
                      onClick={() => {
                        setFieldValue('mainImage', null);
                        setSelectedImage(defaultImage);
                      }}
                      className="absolute top-0 right-0 mt-1 h-8 w-8 bg-red-500 text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
                    >
                      X
                    </button>
                  )}
                </div>
              )}
              <div className="grid grid-cols-5 gap-5">
                {secondaryImages &&
                  Array.from(secondaryImages).map((file, index) => {
                    const imageUrl = URL.createObjectURL(file);
                    return (
                      <div key={index} className="relative col-span-1">
                        <ImageWithSkeleton url={imageUrl} />
                        <button
                          onClick={() => {
                            const filesArray = Array.from(secondaryImages);
                            const newFileList = filesArray.filter(
                              (e) => e.name !== file.name,
                            );
                            setFieldValue('secondaryImages', newFileList);
                            setSecondaryImages(newFileList);
                          }}
                          className="absolute top-0 right-0 mt-1 h-8 w-8 bg-red-500 text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <Label>Selecciona una imagen principal :</Label>
              <Input
                type="file"
                name="mainImage"
                onChange={(event) => {
                  handleImageChange(event);
                  setFieldValue('mainImage', event.currentTarget.files![0]);
                }}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <Label>Selecciona las imágenes secundarias:</Label>
              <Input
                type="file"
                name="secondaryImages" // Nombre coincidente con el backend
                multiple
                onChange={(event) => {
                  handleSecondaryImageChange(event);
                  setFieldValue('secondaryImages', event.currentTarget.files);
                }}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <Label>Ingresa una descripción :</Label>
              <Input
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={30}
                value={values.description}
                placeholder="Zapatillas Nike Blancas ..."
              />
            </div>
            <Label>Nombre de la coleccion de imagenes: :</Label>
            <Input
              name="collection"
              required
              maxLength={25}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.collection}
              placeholder="Imagenes sin fondo ..."
            />
            <Button onClick={() => showCategoryModal()} variant="outline">
              Selecciona una categoría
            </Button>  
            <div className='w-full'>
               <Dropdown variant="colors" />
            <Dropdown variant="genders" />
            <Dropdown variant="brands" />
            <Dropdown variant="styles" />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              Crear producto
            </Button>
          </form>
        )}
      </Formik>
      <ModalCategory
        isCategoryModalOpen={isCategoryModalOpen}
        handleFilterClick={handleFilterClick}
        handleCloseModal={hideCategoryModal}
        filter={filter}
      />
    </div>
  );
};
