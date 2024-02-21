import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../redux';
import { ImageVariantsProduct } from '@/types';

interface VariantsState {
  data: ImageVariantsProduct[] | null;
}
const initialState: VariantsState = {
  data: null,
};
export const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    setVariants: (state, action: PayloadAction<VariantsState>) => {
      state = action.payload;
    },
  },
});
export const { setVariants } = variantsSlice.actions;
export const selectVariants = (state: RootState) => state.variants.data;
export default variantsSlice.reducer;
