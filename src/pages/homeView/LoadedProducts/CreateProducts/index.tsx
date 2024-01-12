import {
  Button,
  Dropdown,
  Input,
  Label,
  LoadingIndicator,
  ModalCategory,
  ModalSize,
} from '@/components';
import { Formik } from 'formik';
import { useForm } from './useForm';
import { useModal } from '@/hooks';
import { ChangeEvent, useState } from 'react';
import imageDefault from '../../../../assets/not_image.png';
import { useSubmit } from './useSubmit';
interface Filters {
  category: string;
  size: string;
}
export const CreateProducts = () => {
  const [image, setImage] = useState<string>(imageDefault);
  const [filter, setFilter] = useState<Filters>({
    category: '',
    size: '',
  });
  const {
    hideModal: hideCategoryModal,
    isOpenModal: isCategoryModalOpen,
    showModal: showCategoryModal,
  } = useModal();
  const {
    hideModal: hideSizeModal,
    isOpenModal: isSizeModalOpen,
    showModal: showSizeModal,
  } = useModal();
  const { initialValues } = useForm();
  const handleFilterClick = (selectedFilter: string, filterType: string) => {
    setFilter({
      ...filter,
      [filterType]: selectedFilter,
    });
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;

        if (typeof result === 'string') {
          setImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={useSubmit({
          image,
          category: filter.category,
          size: filter.size,
        })}
      >
        {({ handleSubmit, isSubmitting, setFieldValue }) => (
          <div className="flex flex-col gap-3 w-[1200px] bg-white p-10">
            <Label className="font-bold text-xl text-center mb-3 bg-slate-100 p-3 ">
              Crear producto
            </Label>
            <Label htmlFor="name">Nombre del producto :</Label>
            <Input onChange={(e) => setFieldValue('name', e.target.value)} />
            <Label htmlFor="price">Precio :</Label>
            <Input
              type="number"
              onChange={(e) => setFieldValue('price', e.target.value)}
            />
            <Label htmlFor="description">Descripción :</Label>
            <Input
              name="description"
              onChange={(e) => setFieldValue('description', e.target.value)}
            />
            <Dropdown variant="brands" />
            <Dropdown variant="colors" />
            <Dropdown variant="genders" />
            <Dropdown variant="ages" />
            <Dropdown variant="styles" />
            <div className="flex gap-3">
              <img src={image} className="w-32 rounded-sm" />
              <Input
                name="image"
                onChange={handleImageChange}
                type="file"
                className="cursor-pointer hover:bg-slate-100"
              />
            </div>
            <Button onClick={() => showSizeModal()}>
              Selecciona un talle/numero
            </Button>
            <Button onClick={() => showCategoryModal()}>
              Selecciona una categoría
            </Button>
            <Button onClick={() => handleSubmit()}>Crear producto</Button>
            <LoadingIndicator isLoading={isSubmitting} />
          </div>
        )}
      </Formik>
      <ModalCategory
        isCategoryModalOpen={isCategoryModalOpen}
        handleFilterClick={handleFilterClick}
        handleCloseModal={hideCategoryModal}
        filter={filter}
      />
      <ModalSize
        isSizeModalOpen={isSizeModalOpen}
        handleFilterClick={handleFilterClick}
        handleCloseModal={hideSizeModal}
        filter={filter}
      />
    </div>
  );
};
