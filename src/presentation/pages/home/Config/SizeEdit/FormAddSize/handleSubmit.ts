import { addSize } from '@services';
import { toast } from 'sonner';

interface ValueProps {
  id: string;
  value: string;
}
interface DataProps {
  title: string;
  values: ValueProps[];
}
export const handleSubmitAdd = async (values: DataProps) => {
  const res = await addSize(values);
  console.log(res);
  toast('Talla/numero creada con éxito!');
};
