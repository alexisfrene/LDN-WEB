// import { supabase } from '@lib';

// export const addMovement = async (newMovement: any) => {
//   try {
//     const { data, error } = await supabase
//       .from('ldn_finance')
//       .insert([newMovement])
//       .select();
//     if (error) {
//       console.error(error);
//       return null;
//     } else {
//       return data;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const getMovement = async (): Promise<any[] | []> => {
//   try {
//     const { data: ldn_finance, error } = await supabase
//       .from('ldn_finance')
//       .select('*')
//       .order('date', { ascending: false })
//       .limit(10);

//     if (error) {
//       console.error(error);
//       return [];
//     } else {
//       if (ldn_finance) {
//         return ldn_finance;
//       } else {
//         return [];
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
