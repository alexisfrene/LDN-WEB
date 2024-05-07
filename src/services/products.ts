import { axiosInstance, axiosInstanceFormData, supabase } from '@lib';
import { Category, Product, Size, UUID } from '@src/types';

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');

    if (response.status !== 200) return new Error();

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getImageUrl = async (publicId: string) => {
  try {
    const url = await axiosInstance.get(`products/image?public_id=${publicId}`);

    return url.data;
  } catch (error) {
    console.log('ERROR  GET IMAGE ->', error);
  }
};
export const getAllCategories = async (): Promise<Category[] | undefined> => {
  try {
    const res = await axiosInstance.get('/categories');

    if (res.data) return res.data;
  } catch (error) {
    console.log('ERROR IN CATEGORIES -->', error);
  }
};
export const getAllSizes = async (): Promise<Size[] | undefined> => {
  try {
    const res = await axiosInstance('/size');
    return res.data;
  } catch (error) {
    console.log('ERROR IN SIZES ALL -->', error);
  }
};

export const createProducts = async (values: Product) => {
  // values.price = Number(values.price);

  // const newProducts = removeEmptyStringProperties(values);
  try {
    const formData = new FormData();
    formData.append('size_id', values.size_id);
    formData.append('size_value', values.size_value);
    formData.append('category_id', values.category_id || '');
    formData.append('category_value', values.category_value || '');
    formData.append('description', values.description || '');
    formData.append('details', JSON.stringify(values.details)); // Asegúrate de que details sea un objeto con propiedades de tipo string
    formData.append('stock', String(values.stock));
    formData.append('name', values.name);
    formData.append('price', String(values.price));
    if (values.primary_image) {
      formData.append('file', values.primary_image);
    }
    const response = await axiosInstanceFormData.post('/products', values);
    console.log(response);
    if (!response) {
      return 'Error al crear un producto en la base de datos';
    } else {
      return response;
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
  setProducts: SetStateFunction<Product[] | null>,
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

export const getAvailableProductCountByVariationId = async (
  variationId: UUID,
) => {
  try {
    const { data, error } = await supabase
      .from('ldn_producs')
      .select('*', { count: 'exact' })
      .eq('produc_variations', variationId)
      .eq('produc_state', true);

    if (error) {
      console.error('Error executing the query:', error);

      return null;
    }

    return data.length;
  } catch (error) {
    console.error('General error:', error);
    return null;
  }
};
