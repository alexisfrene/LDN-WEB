import { ProductsBySupabase } from '@src/types';
interface StyleDataProps {
  product: ProductsBySupabase;
}

export const StyleData: React.FC<StyleDataProps> = ({ product }) => {
  return (
    <div>
      <h2 className="ml-2 mb-5 text-2xl font-bold">Detalles de estilos</h2>
      <div className="flex items-center justify-between text-xl border-b font-semibold">
        <label className="font-bold px-1 w-56 pb-2">Estilo :</label>
        <p className="pb-1 w-52 truncate px-1">
          {product.produc_style ?? 'Sin definir'}
        </p>
      </div>
      <div className="flex items-center justify-between text-xl border-b font-semibold">
        <label className="font-bold px-1 w-56 pb-2">Color :</label>
        <p className="pb-1 w-52 truncate px-1">
          {product.produc_color ?? 'Sin color'}
        </p>
      </div>
      <div className="flex items-center justify-between text-xl border-b font-semibold">
        <label className="font-bold px-1 w-56 pb-2">Edad :</label>
        <p className="pb-1 w-52 truncate px-1">
          {product.produc_age ?? 'Sin definir'}
        </p>
      </div>
      <div className="flex items-center justify-between text-xl border-b font-semibold">
        <label className="font-bold px-1 w-56 pb-2">Generó :</label>
        <p className="pb-1 w-52 truncate px-1">
          {product.produc_gender ?? 'Sin definir'}
        </p>
      </div>
    </div>
  );
};
