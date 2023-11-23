import { filterAndMapTitles } from "../../../utils";
import { producsCategory } from "../../../mocks";
import { ProductsBySupabase } from "../../../types";
import React from "react";

interface ProductCardProps {
  product: ProductsBySupabase;
  handleClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleClick,
}) => {
  return (
    <div
      className="col-span-3 cursor-pointer transition transform duration-300 hover:scale-105 hover:bg-amber-300 rounded-lg border-2 p-4 flex flex-col items-center justify-center bg-white shadow-md"
      onClick={handleClick}
    >
      <h3 className="text-lg font-bold mb-2">{product.produc_name}</h3>
      <img
        src={`https://zswiaehagcrvvuvlxsmg.supabase.co/storage/v1/object/public/ldn_bucket/${product.produc_image_url}`} //TODO: Acomodar esto
        className="object-cover h-96 w-full rounded-md mb-2"
        alt={product.produc_name}
      />
      <div className="flex justify-between w-full">
        <span className="text-sm">
          {filterAndMapTitles(product.produc_category, producsCategory)}
        </span>
        <span
          className={`text-sm ${
            product.produc_state ? "text-green-500" : "text-red-600"
          }`}
        >
          {product.produc_state ? "DISPONIBLE" : "AGOTADO"}
        </span>
        <span className="text-lg font-bold">${product.produc_price}</span>
      </div>
    </div>
  );
};
