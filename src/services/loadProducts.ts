import { supabase } from '../lib/connectionToSupabase';
import { ProductsBySupabase } from '../types';
const loadAbort = () => {
  const controller = new AbortController();
  return controller;
};

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export const getProductsBySupabase = () => {
  const controller = loadAbort();

  return {
    call: supabase.from('ldn_producs').select().abortSignal(controller.signal),
    controller,
  };
};

const removeEmptyStringProperties = (
  obj: ProductsBySupabase,
): ProductsBySupabase => {
  const cleanedObject: Partial<ProductsBySupabase> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.trim() !== '') {
      cleanedObject[key as keyof ProductsBySupabase] = value as string;
    } else if (typeof value !== 'string') {
      cleanedObject[key as keyof ProductsBySupabase] = value;
    }
  }

  // Si es necesario, puedes realizar una conversión de tipo seguro
  return cleanedObject as ProductsBySupabase;
};
export const createProductsBySupabase = async (values: ProductsBySupabase) => {
  values.produc_price = Number(values.produc_price);
  values.user = '13fc1ae1-ba0d-42c6-b83c-91c96831d623'; //TODO:ver esto
  const newProducts = removeEmptyStringProperties(values);
  try {
    const { data, error } = await supabase
      .from('ldn_producs')
      .insert(newProducts)
      .select();
    if (error) {
      return 'Error al crear un producto en la base de datos';
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

interface filterProps {
  category: string | boolean;
  size: string | boolean;
}

export const handleFilterSubmit = async (
  filter: filterProps,
  setProducts: SetStateFunction<ProductsBySupabase[] | null>,
) => {
  if (filter.category && filter.size) {
    const { data } = await supabase
      .from('ldn_producs')
      .select()
      .eq('produc_category', filter.category)
      .eq('produc_size', filter.size);

    if (data) {
      return setProducts(data?.sort((a, b) => b.produc_price - a.produc_price));
    } else {
      return setProducts([]);
    }
  }

  if (filter.category) {
    const { data } = await supabase
      .from('ldn_producs')
      .select()
      .eq('produc_category', filter.category);

    if (data) {
      return setProducts(data?.sort((a, b) => b.produc_price - a.produc_price));
    }
  }

  if (filter.size) {
    const { data } = await supabase
      .from('ldn_producs')
      .select()
      .eq('produc_size', filter.size);
    if (data) {
      return setProducts(data?.sort((a, b) => b.produc_price - a.produc_price));
    }
  }
};

export const removeProductsBySupabase = async (id: string) => {
  try {
    const { error } = await supabase
      .from('ldn_producs')
      .update({ produc_state: false })
      .eq('id', id);
    if (!error) return true;
    return false;
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
  id: string,
) => {
  try {
    if (dataNew?.produc_price) {
      dataNew.produc_price = Number(dataNew.produc_price);
    }
    const { data, error } = await supabase
      .from('ldn_producs')
      .update(dataNew)
      .eq('id', id);
    if (!error) return data;
  } catch (error) {
    console.error(error);
  }
};
