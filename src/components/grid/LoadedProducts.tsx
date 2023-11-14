import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { supabase } from "../../lib/connectionToSupabase";
import { ProductsBySupabase } from "../../types/Product";
import { producsCategory, productsSize } from "../../mocks";
interface Filters {
  category: string | boolean;
  size: string | boolean;
}

export const LoadedProducts = () => {
  const [products, setProducts] = useState<ProductsBySupabase[] | null>([]);
  const [filter, setFilter] = useState<Filters>({
    category: false,
    size: false,
  });
  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const [modalSize, setModalSize] = useState<boolean>(false);
  async function getProductsBySupabase() {
    const { data } = await supabase.from("ldn_producs").select();
    setProducts(data);
  }
  const filterAndMapTitles = (
    filterType: string | boolean
  ): string | undefined => {
    const matchingCategory = producsCategory.find(
      (category) => category.type === filterType
    );

    return matchingCategory?.title;
  };

  const sizes = productsSize();

  const handleFilterSubmit = async () => {
    if (filter.category && filter.size) {
      const { data } = await supabase
        .from("ldn_producs")
        .select()
        .eq("produc_category", filter.category)
        .eq("produc_size", filter.size);
      return setProducts(data);
    }

    if (filter.category) {
      const { data } = await supabase
        .from("ldn_producs")
        .select()
        .eq("produc_category", filter.category);
      return setProducts(data);
    }

    if (filter.size) {
      const { data } = await supabase
        .from("ldn_producs")
        .select()
        .eq("produc_size", filter.size);
      return setProducts(data);
    }

    return getProductsBySupabase();
  };

  useEffect(() => {
    getProductsBySupabase();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-3 mx-5">
      <div className="col-span-12 flex justify-start gap-10 items-center bg-amber-200 h-12 px-3">
        <span>Filtrar por : </span>

        <div
          className="bg-amber-500 hover:bg-amber-400 hover:text-slate-600 cursor-pointer p-3 rounded-lg shadow-lg"
          onClick={() => setModalCategory(true)}
        >
          Categoria
        </div>
        <div
          className="bg-amber-500 hover:bg-amber-400 hover:text-slate-600 cursor-pointer py-3 px-6 rounded-lg shadow-lg"
          onClick={() => setModalSize(true)}
        >
          Talle
        </div>
        <div
          className="bg-white hover:bg-slate-200 hover:text-slate-600 cursor-pointer py-3 px-6 rounded-lg shadow-lg"
          onClick={handleFilterSubmit}
        >
          Filtrar
        </div>

        {filter.category && (
          <p>{"Categoria :" + filterAndMapTitles(filter.category)}</p>
        )}
        {filter.size && <p>{"Numero/Talle :" + filter.size}</p>}

        {(filter.category || filter.size) && (
          <div
            className="bg-white hover:bg-slate-200 hover:text-slate-600 cursor-pointer py-3 px-6 rounded-lg shadow-lg"
            onClick={() => {
              getProductsBySupabase();
              setFilter({ category: false, size: false });
            }}
          >
            Borrar filtros
          </div>
        )}
      </div>
      {products?.length &&
        products.map((product) => {
          return (
            <div className="col-span-3" key={product.id}>
              <h3>{product.produc_name}</h3>
              <img
                src={`https://zswiaehagcrvvuvlxsmg.supabase.co/storage/v1/object/public/ldn_bucket/${product.produc_image_url}`}
                className="object-cover h-96 w-96"
              />
              <div className="flex justify-between font-semibold text-lg bg-amber-400 rounded-b-lg px-2">
                <span>{filterAndMapTitles(product.produc_category)}</span>
                <span
                  className={
                    product.produc_state ? "text-green-500" : "text-red-600"
                  }
                >
                  DISPONIBLE
                </span>
                <span>{`$ ${product.produc_price}`}</span>
              </div>
            </div>
          );
        })}
      <ReactModal
        isOpen={modalCategory}
        onRequestClose={() => setModalCategory(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="bg-white grid grid-cols-4 p-3 gap-2">
          <h3 className="col-span-4 mb-3 text-xl font-semibold">
            Selecciona una categoria para filtrar :
          </h3>
          {producsCategory.map((category) => {
            return (
              <div
                className="bg-slate-300 border-2 text-center  p-2 col-span-1 cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  setFilter({ category: category.type, size: filter.size })
                }
              >
                {filterAndMapTitles(category.type)}
              </div>
            );
          })}
          <div className="col-span-4 mt-3">
            <button className="bg-green-400 w-1/2 h-10 hover:bg-green-500">
              Aceptar
            </button>
            <button
              className="bg-red-500 w-1/2 h-10 hover:bg-red-600"
              onClick={() => setModalCategory(false)}
            >
              Calcelar
            </button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={modalSize}
        onRequestClose={() => setModalSize(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="bg-white grid grid-cols-12 p-3 gap-2">
          <h3 className="col-span-12 mb-3 text-xl font-semibold">
            Selecciona un numero para filtrar :
          </h3>
          {sizes.number.map((size) => {
            return (
              <div
                className="bg-slate-300 border-2 text-center  p-2 col-span-1 cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  setFilter({
                    category: filter.category,
                    size: size.toString(),
                  })
                }
              >
                {size.toString()}
              </div>
            );
          })}
          <h3 className="col-span-12 mb-3 text-xl font-semibold">
            Selecciona un talle para filtrar :
          </h3>
          {sizes.letter.map((size) => {
            return (
              <div
                className="bg-slate-300 border-2 text-center  p-2 col-span-1 cursor-pointer hover:bg-slate-400"
                onClick={() =>
                  setFilter({
                    category: filter.category,
                    size: size.toString(),
                  })
                }
              >
                {size.toString()}
              </div>
            );
          })}
          <div className="col-span-12 mt-3">
            <button className="bg-green-400 w-1/2 h-10 hover:bg-green-500">
              Aceptar
            </button>
            <button
              className="bg-red-500 w-1/2 h-10 hover:bg-red-600"
              onClick={() => setModalSize(false)}
            >
              Calcelar
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};
