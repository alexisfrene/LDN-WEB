import { axiosInstance, axiosInstanceFormData } from '@lib';
import { Details, Product } from '@src/types';

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

export const createProducts = async (values: Product) => {
  try {
    const formData = new FormData();
    formData.append('size_id', values.size_id);
    formData.append('size_value', values.size_value);
    formData.append('category_id', values.category_id || '');
    formData.append('category_value', values.category_value || '');
    formData.append('description', values.description || '');
    formData.append('stock', String(values.stock));
    formData.append('name', values.name);
    formData.append('price', String(values.price));
    if (values.primary_image) {
      formData.append('file', values.primary_image);
    }
    const details = values?.details;
    formData.append('details[color]', details?.color || '');
    formData.append('details[age]', details?.age || '');
    formData.append('details[gender]', details?.gender || '');
    formData.append('details[brand]', details?.brand || '');
    formData.append('details[style]', details?.style || '');
    const response = await axiosInstanceFormData.post('/products', formData);
    if (!response) {
      return 'Error al crear un producto en la base de datos';
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// interface filterProps {
//   category: string | boolean;
//   size: string | boolean;
// }

// export const handleFilterSubmit = async (
//   filter: filterProps,
//   setProducts: SetStateFunction<Product[] | null>,
// ) => {
//   if (filter.category && filter.size) {
//     const { data } = await supabase
//       .from('ldn_producs')
//       .select()
//       .eq('produc_category', filter.category)
//       .eq('produc_size', filter.size);

//     if (data) {
//       return setProducts(data?.sort((a, b) => b.produc_price - a.produc_price));
//     } else {
//       return setProducts([]);
//     }
//   }

//   if (filter.category) {
//     const { data } = await supabase
//       .from('ldn_producs')
//       .select()
//       .eq('produc_category', filter.category);

//     if (data) {
//       return setProducts(data?.sort((a, b) => b.produc_price - a.produc_price));
//     }
//   }

//   if (filter.size) {
//     const { data } = await supabase
//       .from('ldn_producs')
//       .select()
//       .eq('produc_size', filter.size);
//     if (data) {
//       return setProducts(data?.sort((a, b) => b.produc_price - a.produc_price));
//     }
//   }
// };

export const removeProduct = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductDetails = async (
  newDetails: Details,
  product_id: string,
) => {
  try {
    const res = await axiosInstance.patch(
      `/products/${product_id}?type=details`,
      newDetails,
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductData = async (
  newDetails: any,
  product_id: string,
) => {
  try {
    const res = await axiosInstance.patch(
      `/products/${product_id}?type=data`,
      newDetails,
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// export const getAvailableProductCountByVariationId = async (
//   variationId: UUID,
// ) => {
//   try {
//     const { data, error } = await supabase
//       .from('ldn_producs')
//       .select('*', { count: 'exact' })
//       .eq('produc_variations', variationId)
//       .eq('produc_state', true);

//     if (error) {
//       console.error('Error executing the query:', error);

//       return null;
//     }

//     return data.length;
//   } catch (error) {
//     console.error('General error:', error);
//     return null;
//   }
// };
