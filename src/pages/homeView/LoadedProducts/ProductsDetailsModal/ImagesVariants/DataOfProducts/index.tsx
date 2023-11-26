import { ProductsBySupabase } from "../../../../../../types";
import {
  ArrowSmallLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { filterAndMapTitles } from "../../../../../../utils";
import { useState } from "react";
import { useFormik } from "formik";
import { getDynamicValue, useForm } from "./useForm";
import { handleSubmit } from "./handleSubmit";
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
      label: "Descripcion :",
      value: produc_description,
      name: "produc_description",
    },
    {
      label: "Precio :",
      value: `$ ${produc_price}`,
      name: "produc_price",
    },
    {
      label: "Marca :",
      value: produc_brand,
      name: "produc_brand",
    },
    {
      label: "Categoria :",
      value: filterAndMapTitles(produc_category),
      name: "produc_category",
    },
    { label: "Numero/Talle :", value: produc_size, name: "produc_size" },
  ];

  const initialValues = useForm();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) =>
      handleSubmit(values, { resetForm }, id, reloadProducts),
  });
  return (
    <>
      {modalEdit ? (
        <div>
          <ArrowSmallLeftIcon
            height={35}
            className="cursor-pointer hover:text-slate-800 hover:scale-105"
            onClick={() => setModalEdit(false)}
          />
          <form onSubmit={formik.handleSubmit}>
            {dataVist.map(({ label, value, name }, i) => {
              return (
                <div
                  className="w-full flex flex-row justify-between text-xl border-b-2"
                  key={`${i}+$`}
                >
                  <h3 className="font-bold">{label}</h3>
                  <input
                    name={name}
                    placeholder={value}
                    className="bg-amber-300"
                    onChange={formik.handleChange}
                    value={getDynamicValue(formik.values, name)}
                  />
                </div>
              );
            })}
            <button type="submit">Enviar</button>
          </form>
        </div>
      ) : (
        <div>
          <PencilSquareIcon
            height={30}
            className="cursor-pointer hover:text-slate-800 hover:scale-105"
            onClick={() => setModalEdit(true)}
          />
          {dataVist.map(({ label, value }, i) => {
            return (
              <div
                className="w-full flex flex-row justify-between text-xl border-b-2"
                key={i}
              >
                <h3 className="font-bold">{label}</h3>
                <h2 className="font-semibold">
                  {value ? value : "No cargado"}
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
