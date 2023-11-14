export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/products");
    if (response.ok) {
      const { products } = await response.json();
      if (Array.isArray(products)) {
        return products;
      } else {
        throw new Error(
          "No se encontró un array de productos en los datos recibidos"
        );
      }
    } else {
      throw new Error("Error al obtener los productos");
    }
  } catch (error) {
    console.error(error);
    // Manejar errores (mostrar un mensaje de error, etc.)
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Producto con ID ${id} eliminado correctamente`);
    } else {
      throw new Error("No se pudo eliminar el producto");
    }
  } catch (error) {
    console.error("Error al eliminar un producto por id");
    console.log(error);
  }
};
