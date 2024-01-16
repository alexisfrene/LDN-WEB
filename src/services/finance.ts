import { UUID } from '@/types/Product';
import { supabase } from '../lib/connectionToSupabase';

interface AddMovementProps {
  id?: UUID;
  created_at?: Date;
  category: string;
  payment_method: string;
  amount: number;
  transaction_type: string;
  price: number;
  produc_id?: UUID;
  description: string;
}

export const addMovement = async (newMovement: AddMovementProps) => {
  try {
    const { data, error } = await supabase
      .from('ldn_finance')
      .insert([newMovement])
      .select();
    if (error) console.log(error);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getMovement = async () => {
  try {
    const { data: ldn_finance, error } = await supabase
      .from('ldn_finance')
      .select('*');

    if (error) {
      return console.log(error);
    } else {
      return ldn_finance;
    }
  } catch (error) {
    console.log(error);
  }
};
