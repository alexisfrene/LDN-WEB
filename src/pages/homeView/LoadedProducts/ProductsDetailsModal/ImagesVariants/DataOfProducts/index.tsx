import {
  ArrowSmallLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { filterAndMapTitles } from "../../../../../../utils";
import { useState } from "react";
import { useFormik } from "formik";
import { getDynamicValue, useForm } from "./useForm";
import { handleSubmit } from "./handleSubmit";
import { ProductsBySupabase } from "../../../../../../types";

interface DataOfProductsProps {
  productSelected: ProductsBySupabase;
  reloadProducts: () => void;
}

export const DataOfProducts: React.FC<DataOfProductsProps> = ({
  productSelected,
  reloadProducts,
}) => {
  const [modalEdit, setModalEdit] = useState(false);
  const {
    produc_price,
    produc_brand,
    produc_category,
    produc_size,
    produc_description,
    id,
  } = productSelected;

  const dataVist = [
    {
      label: "Descripcion:",
      value: produc_description,
      name: "produc_description",
    },
    {
      label: "Precio:",
      value: `$ ${produc_price}`,
      name: "produc_price",
    },
    {
      label: "Marca:",
      value: produc_brand,
      name: "produc_brand",
    },
    {
      label: "Categoria:",
      value: filterAndMapTitles(produc_category),
      name: "produc_category",
    },
    { label: "Numero/Talle:", value: produc_size, name: "produc_size" },
  ];

  const initialValues = useForm();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) =>
      handleSubmit(values, { resetForm }, id, reloadProducts),
  });

  return (
    <div className="p-4 border rounded-md shadow-md">
      <div className="flex items-center mb-4">
        {modalEdit ? (
          <ArrowSmallLeftIcon
            height={35}
            className="cursor-pointer hover:text-slate-800 hover:scale-105"
            onClick={() => setModalEdit(false)}
          />
        ) : (
          <PencilSquareIcon
            height={30}
            className="cursor-pointer hover:text-slate-800 hover:scale-105"
            onClick={() => setModalEdit(true)}
          />
        )}
        <h2 className="ml-2 text-xl font-semibold">Detalles del Producto</h2>
      </div>

      <form onSubmit={formik.handleSubmit}>
        {dataVist.map(({ label, value, name }, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-xl border-b-2 mb-2"
          >
            <label className="font-bold">{label}</label>
            {modalEdit ? (
              <input
                name={name}
                placeholder={value}
                className="p-2 bg-amber-100 rounded-md"
                onChange={formik.handleChange}
                value={getDynamicValue(formik.values, name)}
              />
            ) : (
              <div className="font-semibold">{value || "No cargado"}</div>
            )}
          </div>
        ))}

        {modalEdit && (
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-amber-500 text-white rounded-md hover:bg-amber-400"
          >
            Enviar
          </button>
        )}
      </form>
    </div>
  );
};
