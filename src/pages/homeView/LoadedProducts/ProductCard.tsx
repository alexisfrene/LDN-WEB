import { filterAndMapTitles } from "../../../utils";
import { producsCategory } from "../../../mocks";
import { ProductsBySupabase } from "../../../types";

export const ProductCard: React.FC<{
  product: ProductsBySupabase;
}> = ({ product }) => {
  return (
    <div className="col-span-3" key={product.id}>
      <h3>{product.produc_name}</h3>
      <img
        src={`https://zswiaehagcrvvuvlxsmg.supabase.co/storage/v1/object/public/ldn_bucket/${product.produc_image_url}`} //TODO:Esto hay que acomodar
        className="object-cover h-96 w-96"
        alt={product.produc_name}
      />
      <div className="flex justify-between font-semibold text-lg bg-amber-400 rounded-b-lg px-2">
        <span>
          {filterAndMapTitles(product.produc_category, producsCategory)}
        </span>
        <span
          className={product.produc_state ? "text-green-500" : "text-red-600"}
        >
          DISPONIBLE
        </span>
        <span>{`$ ${product.produc_price}`}</span>
      </div>
    </div>
  );
};
