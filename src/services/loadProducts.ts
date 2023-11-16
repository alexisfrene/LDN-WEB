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
export const handleFilterSubmit = async (filter, setProducts) => {
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
