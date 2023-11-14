import { useState, ChangeEvent } from "react";
import { Field, FieldProps, Formik } from "formik";
import defaultImage from "../../../assets/default.png";
import { useSubmit } from "./useSubmit";
import { useForm } from "./useForm";
import { DropdownInput } from "../../common/DropDown";
import { producsCategory } from "../../../mocks";

export const CreateProducts: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
  const [secondaryImages, setSecondaryImages] = useState<FileList | null>(null);

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
      <div className="h-96 overflow-y-auto overflow-x-hidden">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Imagen principal"
            className="m-1 w-80 h-80 object-contain"
          />
        )}
        <div className="flex flex-wrap">
          {secondaryImages &&
            Array.from(secondaryImages).map((file, index) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="m-1">
                  <img
                    src={imageUrl}
                    alt={`Imagen secundaria ${index + 1}`}
                    className="w-40 h-40 object-contain"
                  />
                </div>
              );
            })}
        </div>
      </div>
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
            <div>
              <h3>Ingresa una descripción :</h3>
              <input
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className="p-2 border rounded w-full bg-slate-150"
              />
            </div>
            <Field name="category">
              {({ field }: FieldProps<string>) => (
                <DropdownInput
                  title="Selecciona una opción:"
                  options={producsCategory}
                  name={field.name}
                />
              )}
            </Field>
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

// import { useState, ChangeEvent } from "react";
// import { Formik } from "formik";
// import defaultImage from "../../../assets/default.png";
// import { useSubmit } from "./useSubmit";
// import { useForm, FormData } from "./useForm"; // Importa FormData

// export const CreateProducts: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<string>(defaultImage);
//   const [secondaryImages, setSecondaryImages] = useState<FileList | null>(null);

//   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//     }
//   };

//   const handleSecondaryImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       setSecondaryImages(files);
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-300 p-10">
//       <div className="bg-slate-200 p-10 rounded shadow-md w-screen ">
//         <div className="h-96">
//           {/* ... (código restante sin cambios) */}
//         </div>
//         <Formik initialValues={useForm()} onSubmit={useSubmit}>
//           {({
//             values,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//             setFieldValue,
//           }) => (
//             <form onSubmit={handleSubmit} className="mb-4">
//               <div>
//                 <h3>Ingresa una descripción :</h3>
//                 <input
//                   name="description"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.description}
//                   className="p-2 border rounded w-full bg-slate-150"
//                 />
//               </div>
//               {/* ... (código restante sin cambios) */}
//             </form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };
