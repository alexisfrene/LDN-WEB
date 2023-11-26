import { supabase } from "../lib/connectionToSupabase";
import { ProductsBySupabase } from "../types";
type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;
export const getProductsBySupabase = async (
  setProducts: SetStateFunction<ProductsBySupabase[] | null>
) => {
  try {
    const { data } = await supabase.from("ldn_producs").select();
    return setProducts(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
interface filterProps {
  category: string | boolean;
  size: string | boolean;
}
export const handleFilterSubmit = async (
  filter: filterProps,
  setProducts: SetStateFunction<ProductsBySupabase[] | null>
) => {
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

  return getProductsBySupabase(setProducts);
};

export const removeProductsBySupabase = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("ldn_producs")
      .update({ produc_state: false })
      .eq("id", id);

    console.log("service", data, error);
    if (!error) return data;
  } catch (error) {
    console.error(error);
  }
};

export interface useFormProps {
  produc_description: string;
  produc_price: string | number;
  produc_brand: string;
  produc_category: string;
  produc_size: string;
}

export const updateProductsBySupabase = async (
  dataNew: useFormProps,
  id: string
) => {
  try {
    if (dataNew?.produc_price) {
      dataNew.produc_price = Number(dataNew.produc_price);
    }
    const { data, error } = await supabase
      .from("ldn_producs")
      .update(dataNew)
      .eq("id", id);
    if (!error) return data;
  } catch (error) {
    console.error(error);
  }
};
