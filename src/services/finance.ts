import { supabase } from '../lib';
import { Movement, AddMovementProps } from '@/types';

export const addMovement = async (newMovement: AddMovementProps) => {
  try {
    const { data, error } = await supabase
      .from('ldn_finance')
      .insert([newMovement])
      .select();
    if (error) {
      console.log(error);
      return null;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMovement = async (): Promise<Movement[] | []> => {
  try {
    const { data: ldn_finance, error } = await supabase
      .from('ldn_finance')
      .select('*')
      .order('date', { ascending: false })
      .limit(10);

    if (error) {
      console.log(error);
      return [];
    } else {
      if (ldn_finance) {
        return ldn_finance;
      } else {
        return [];
      }
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};