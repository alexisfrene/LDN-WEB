import { filterAndMapTitles } from "../../../utils";
import { ProductsBySupabase } from "../../../types";
import { Cloudinary } from "@cloudinary/url-gen";
interface ProductCardProps {
  product: ProductsBySupabase;
  handleClick: () => void;
  handleClose: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleClick,
  handleClose,
}) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ldn-img",
    },
  });

  const myImage =
    cld.image(product.produc_image_url).toURL() ||
    `https://zswiaehagcrvvuvlxsmg.supabase.co/storage/v1/object/public/ldn_bucket/${product.produc_image_url}`;

  return (
    <div
      className={`col-span-3 cursor-pointer transition transform duration-150  rounded-lg border-2 p-4 flex flex-col items-center justify-center ${
        product.produc_state
          ? "bg-orange-300 hover:bg-amber-300"
          : "bg-slate-300 hover:bg-slate-200"
      } shadow-md`}
    >
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 mt-1 mr-1 h-8 w-8 bg-red-500 text-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
      >
        X
      </button>
      <div onClick={handleClick}>
        <h3 className="text-lg font-bold mb-2">{product.produc_name}</h3>
        <img
          src={myImage}
          className="object-cover h-96 w-full rounded-md mb-2"
          alt={product.produc_name}
        />
        <div className="flex justify-between w-full">
          <span className="text-lg">
            {filterAndMapTitles(product.produc_category)}
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
    </div>
  );
};
