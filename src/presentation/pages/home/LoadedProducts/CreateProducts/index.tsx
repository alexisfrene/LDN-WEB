import { Formik } from 'formik';
import { useForm } from './useForm';
import { Button, Input, Label } from '@components';
import { createProducts } from '@src/services';

export const CreateProducts = () => {
  const initialValues = useForm();
  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => await createProducts(values)}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => (
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
            {/* <Dropdown variant="brands" />
            <Dropdown variant="colors" />
            <Dropdown variant="genders" />
            <Dropdown variant="ages" />
            <Dropdown variant="styles" /> */}
            {/* <div className="flex gap-3">
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
            </Button> */}

            <Button onClick={() => handleSubmit()}>Crear producto</Button>
            {errors.name && touched.name ? (
              <div className="text-red-600">{errors.name}</div>
            ) : null}
          </div>
        )}
      </Formik>
      {/* <ModalCategory
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
      /> */}
    </div>
  );
};
