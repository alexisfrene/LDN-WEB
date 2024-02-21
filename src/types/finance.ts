import { UUID } from '.';

export type Movement = {
  amount: number;
  description: string;
  date: string;
  price: number;
};
export type AddMovementProps = {
  id?: UUID;
  created_at?: Date;
  category: string;
  payment_method: string;
  amount: number;
  transaction_type: string;
  price: number;
  produc_id?: UUID;
  description: string;
};
