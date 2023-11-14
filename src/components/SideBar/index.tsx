import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { BuildingStorefrontIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { fetchProducts } from "../../services/products";
import { ProductsNavBar } from "../NavBar/ProductsNavBar";
import { Product } from "../../types";
import { CreateProducts } from "../forms";
import { ProductGrid } from "../grid/ProductGrid";
import { LoadedProducts } from "../grid/LoadedProducts";

export const SideBar = () => {
  const [product, setProducts] = useState<Product[] | []>([]);
  const ldnButtons = [
    { title: "Imagenes", icon: <PhotoIcon className="h-16" /> },
    { title: "Productos", icon: <BuildingStorefrontIcon className="h-16" /> },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      if (products?.length) setProducts(products);
    };
    fetchData();
  }, []);

  return (
    <Tabs className="grid grid-cols-12 grid-rows-6">
      <TabList className="bg-gradient-to-br from-orange-100 to-orange-400 col-span-1 row-span-6 min-h-screen">
        {ldnButtons.map((button) => {
          return (
            <Tab
              className="h-20 bg-gradient-to-b from-orange-150 to-orange-450 m-0.5 rounded-xl cursor-pointer flex flex-col justify-center"
              key={button.title}
            >
              <p className="text-center text-lg mt-1">{button.title}</p>
              {button.icon}
            </Tab>
          );
        })}
      </TabList>
      <div className="col-span-11 row-span-6">
        <TabPanel>
          <ProductsNavBar
            tabs={["Ver Productos", "Crear Producto", "Editar productos"]}
          >
            <TabPanel>
              <ProductGrid products={product} setProducts={setProducts} />
            </TabPanel>
            <TabPanel>
              <CreateProducts />
            </TabPanel>
            <TabPanel>
              <ProductGrid products={product} setProducts={setProducts} />
            </TabPanel>
          </ProductsNavBar>
        </TabPanel>
        <TabPanel>
          <ProductsNavBar
            tabs={["Stock de productos", "Crear Producto", "Editar productos"]}
          >
            <TabPanel>
              <LoadedProducts />
            </TabPanel>
            <TabPanel>
              <LoadedProducts />
            </TabPanel>
            <TabPanel>
              <LoadedProducts />
            </TabPanel>
          </ProductsNavBar>
        </TabPanel>
      </div>
    </Tabs>
  );
};
