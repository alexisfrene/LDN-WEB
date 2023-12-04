import { useState, ChangeEvent } from "react";
import { Field, FieldProps, Formik } from "formik";
import { useSubmit } from "./useSubmit";
import { useForm } from "./useForm";
import { DropdownInput } from "../../../components";
import { producsCategory } from "../../../mocks";
import defaultImage from "../../../assets/default.png";

export const CreateProducts: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [secondaryImages, setSecondaryImages] = useState<
    FileList | null | File[]
  >(null);
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

  return (
    <div className="p-10 rounded shadow-md w-full">
      <Formik initialValues={useForm()} onSubmit={useSubmit}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="h-96 overflow-y-auto overflow-x-hidden">
              {selectedImage && (
                <div className="relative w-80 h-80">
                  <img
                    src={selectedImage}
                    alt="Imagen principal"
                    className="m-1  object-contain"
                  />
                  {defaultImage !== selectedImage && (
                    <button
                      onClick={() => {
                        setFieldValue("mainImage", null);
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
                        <img
                          src={imageUrl}
                          alt={`Imagen secundaria ${index + 1}`}
                          className="m-1 object-cover"
                        />
                        <button
                          onClick={() => {
                            const filesArray = Array.from(secondaryImages);
                            const newFileList = filesArray.filter(
                              (e) => e.name !== file.name
                            );
                            setFieldValue("secondaryImages", newFileList);
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
              <h3>Selecciona una imagen principal :</h3>
              <input
                type="file"
                name="mainImage"
                onChange={(event) => {
                  handleImageChange(event);
                  setFieldValue("mainImage", event.currentTarget.files![0]);
                }}
                onBlur={handleBlur}
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <h3>Selecciona las imágenes secundarias:</h3>
              <input
                type="file"
                name="secondaryImages" // Nombre coincidente con el backend
                multiple
                onChange={(event) => {
                  handleSecondaryImageChange(event);
                  setFieldValue("secondaryImages", event.currentTarget.files);
                }}
                onBlur={handleBlur}
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <h3>Ingresa una descripción :</h3>
              <input
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className="p-2 border rounded w-full bg-slate-150"
                placeholder="Zapatillas Nike Blancas ..."
              />
            </div>
            <h3>Nombre de la coleccion de imagenes: :</h3>
            <input
              name="collection"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.collection}
              className="p-2 border rounded w-full bg-slate-150 mt-3"
              placeholder="Imagenes sin fondo ..."
            />
            <Field name="category">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona una opción:"
                  options={producsCategory}
                  name={field.name}
                />
              )}
            </Field>
            <Field name="color">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona un color"
                  options={[
                    { type: "RED", title: "ROJO 🟥" },
                    { type: "BLUE", title: "AZUL 🔵" },
                    { type: "GREEN", title: "VERDE 🟩" },
                    { type: "YELLOW", title: "AMARILLO 🟨" },
                    { type: "ORANGE", title: "NARANJA 🟧" },
                    { type: "PURPLE", title: "VIOLETA 🟪" },
                    { type: "PINK", title: "ROSADO 🌸" },
                    { type: "BROWN", title: "MARRÓN 🟫" },
                    { type: "GRAY", title: "GRIS 🟨" },
                    { type: "BLACK", title: "NEGRO ⚫" },
                    { type: "WHITE", title: "BLANCO ⚪" },
                    { type: "UNSPECIFIED", title: "SIN ESPECIFICAR ❓" },
                  ]}
                  name={field.name}
                />
              )}
            </Field>
            <Field name="gender">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona un genero"
                  options={[
                    { type: "MALE", title: "MASCULINO" },
                    { type: "FEMALE", title: "FEMENINO" },
                    { type: "UNSPECIFIED", title: "SIN ESPECIFICAR" },
                  ]}
                  name={field.name}
                />
              )}
            </Field>
            <Field name="brand">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona una marca"
                  options={[
                    { type: "NIKE", title: "NIKE" },
                    { type: "PUMA", title: "PUMA" },
                    { type: "ADDIDAS", title: "ADDIDAS" },
                    { type: "OTHER", title: "OTRA" },
                  ]}
                  name={field.name}
                />
              )}
            </Field>
            <Field name="style">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona estilo"
                  options={[
                    { type: "URBAN", title: "URBANAS" },
                    { type: "SPORTS", title: "DEPORTIVAS" },
                    { type: "UNSPECIFIED", title: "SIN ESPECIFICAR" },
                  ]}
                  name={field.name}
                />
              )}
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 text-white px-4 py-2 rounded mt-4 h-20 w-44 text-lg hover:bg-amber-400 hover:text-gray-200"
            >
              Crear producto
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
