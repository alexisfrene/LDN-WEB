import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BuildingStorefrontIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { fetchProducts } from "../../services";
import { ImageVariantsProduct } from "../../types";
import { CreateProducts, ProductGrid, ProductsNavBar } from "../../components";
import { LoadedProducts } from "./LoadedProducts";

const tabButtons = [
  { title: "Imagenes", icon: <PhotoIcon className="h-16" /> },
  { title: "Productos", icon: <BuildingStorefrontIcon className="h-16" /> },
];
const ProductsTabs = [
  "Stock de productos",
  "Crear Producto",
  "Editar productos",
];
const imageTabs = ["Ver Productos", "Crear Producto", "Editar productos"];

export const HomeView = () => {
  const [variationsImages, setVariationsImages] = useState<
    ImageVariantsProduct[] | []
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      if (products?.length) setVariationsImages(products);
    };
    fetchData();
  }, []);

  return (
    <Tabs className="grid grid-cols-12 grid-rows-6">
      <TabList className="bg-gradient-to-br from-orange-100 to-orange-400 col-span-1 row-span-6 min-h-screen">
        {tabButtons.map(({ title, icon }) => (
          <Tab
            className="h-20 bg-gradient-to-b from-orange-150 to-orange-450 m-0.5 rounded-xl cursor-pointer flex flex-col justify-center"
            key={title}
          >
            <p className="text-center text-lg mt-1">{title}</p>
            {icon}
          </Tab>
        ))}
      </TabList>
      <div className="col-span-11 row-span-6">
        <TabPanel>
          <ProductsNavBar tabs={imageTabs}>
            <TabPanel>
              <ProductGrid
                products={variationsImages}
                setProducts={setVariationsImages}
              />
            </TabPanel>
            <TabPanel>
              <CreateProducts />
            </TabPanel>
            <TabPanel>
              <ProductGrid
                products={variationsImages}
                setProducts={setVariationsImages}
              />
            </TabPanel>
          </ProductsNavBar>
        </TabPanel>
        <TabPanel>
          <ProductsNavBar tabs={ProductsTabs}>
            <TabPanel>
              <LoadedProducts />
            </TabPanel>
            <TabPanel>
              <LoadedProducts />
              {/* //TODO:crear vista */}
            </TabPanel>
            <TabPanel>
              <LoadedProducts />
              {/* //TODO:crear vista */}
            </TabPanel>
          </ProductsNavBar>
        </TabPanel>
      </div>
    </Tabs>
  );
};
