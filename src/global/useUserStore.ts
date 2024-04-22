import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  user_id: string;
  last_name: string;
  first_name: string;
  username: string;
  country: string;
  email: string;
  recent_activity: [];
  birthday_date: string;
  phone_number: string | null;
  gender: string;
  session_token: string;
  role: string | null;
  products_table: string;
  avatar_url: string;
};

type Action = {
  updateAllUserInfo: (values: State) => void;
};

export const useUserStore = create(
  persist<State & Action>(
    (set) => ({
      user_id: '',
      last_name: '',
      first_name: '',
      username: '',
      country: '',
      email: '',
      recent_activity: [],
      birthday_date: '',
      phone_number: '',
      gender: '',
      session_token: '',
      role: '',
      products_table: '',
      avatar_url: '',
      updateAllUserInfo: (state) => set({ ...state }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
