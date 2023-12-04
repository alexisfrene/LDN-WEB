import axios from 'axios';

const loadAbort = () => {
  const controller = new AbortController();
  return controller;
};
export const fetchProducts = () => {
  const controller = loadAbort();
  return {
    call: axios.get('http://localhost:3001/api/products', {
      signal: controller.signal,
    }),
    controller,
  };
};

export const insertImageId = async (
  product_id: string,
  product_image_id: string,
) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/products?product_id=${product_id}&product_image_id=${product_image_id}`,
      {
        method: 'POST',
      },
    );
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error('Error al obtener los productos');
    }
  } catch (error) {
    console.error(error);
    // Manejar errores (mostrar un mensaje de error, etc.)
  }
};

export const fetchProductsForCategory = async (category: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/products?category=${category}`,
    );
    if (response.ok) {
      const { data } = await response.json();
      if (Array.isArray(data)) {
        return data;
      } else {
        throw new Error(
          'No se encontró un array de productos en los datos recibidos',
        );
      }
    } else {
      throw new Error('Error al obtener los productos');
    }
  } catch (error) {
    console.error(error);
    // Manejar errores (mostrar un mensaje de error, etc.)
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log(`Producto con ID ${id} eliminado correctamente`);
    } else {
      throw new Error('No se pudo eliminar el producto');
    }
  } catch (error) {
    console.error('Error al eliminar un producto por id');
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/products/${id}`);
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error('No se pudo encontrado el producto');
    }
  } catch (error) {
    console.error('Error al encontrado un producto por id');
  }
};
