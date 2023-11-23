import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ProductsBySupabase } from "../../../../types";
import { ImagesVariants } from "./ImagesVariants";

interface ProductsDetailsModalProps {
  productSelected: ProductsBySupabase;
}

export const ProductsDetailsModal: React.FC<ProductsDetailsModalProps> = ({
  productSelected,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabSelect = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="bg-amber-400 p-4 rounded-lg overflow-hidden">
      <Tabs
        selectedIndex={activeTab}
        onSelect={handleTabSelect}
        key="tab-products-details"
      >
        <TabList className="flex justify-between bg-amber-300 rounded-t-lg p-2">
          <Tab
            className={`${
              activeTab === 0 ? "bg-amber-600" : "bg-amber-500"
            } p-3 rounded-lg hover:bg-amber-600 cursor-pointer transition duration-300`}
          >
            Datos del producto
          </Tab>
          <Tab
            className={`${
              activeTab === 1 ? "bg-amber-600" : "bg-amber-500"
            } p-3 rounded-lg hover:bg-amber-600 cursor-pointer transition duration-300`}
          >
            Estilos
          </Tab>
          <Tab
            className={`${
              activeTab === 2 ? "bg-amber-600" : "bg-amber-500"
            } p-3 rounded-lg hover:bg-amber-600 cursor-pointer transition duration-300`}
          >
            Imágenes
          </Tab>
        </TabList>

        <div className="mt-3">
          <div className="info-item text-2xl font-bold mb-2">
            {`Nombre del producto: ${
              productSelected.produc_name ?? "Sin nombre"
            }`}
          </div>
          <img
            src={`https://zswiaehagcrvvuvlxsmg.supabase.co/storage/v1/object/public/ldn_bucket/${productSelected.produc_image_url}`} //TODO:Acomodar esto
            className="object-cover h-96 w-96 rounded-lg mb-3"
            alt={productSelected.produc_name}
          />
          <div className="h-44">
            <TabPanel>
              <div className="info-item text-lg mb-2">{`Descripción: ${
                productSelected.produc_description ?? "Sin descripción"
              }`}</div>
              <div className="info-item text-lg mb-2">{`Precio: ${
                "$" + productSelected.produc_price ?? "Sin precio"
              }`}</div>
              <div className="info-item text-lg mb-2">{`Marca: ${
                productSelected.produc_brand ?? "Sin marca"
              }`}</div>
              <div className="info-item text-lg mb-2">{`Numero/Talle: ${
                productSelected.produc_size ?? "Sin definir"
              }`}</div>
              <div className="info-item text-lg mb-2">{`Categoria: ${
                productSelected.produc_category ?? "Sin categoria"
              }`}</div>
            </TabPanel>
            <TabPanel>
              <div className="info-item text-lg mb-2">{`Estilo: ${
                productSelected.produc_style ?? "Sin definir"
              }`}</div>
              <div className="info-item text-lg mb-2">{`Color: ${
                productSelected.produc_color ?? "Sin color"
              }`}</div>
              <div className="info-item text-lg mb-2">{`Edad: ${
                productSelected.produc_age ?? "Sin definir"
              }`}</div>
              <div className="info-item text-lg mb-2">{`Género: ${
                productSelected.produc_gender ?? "Sin definir"
              }`}</div>
            </TabPanel>
            <TabPanel>
              <ImagesVariants productSelected={productSelected} />
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
