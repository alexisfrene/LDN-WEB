import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  session_token: string;
  avatar: string;
};

type Action = {
  insertSessionToken: (values: State) => void;
  insertAvatar: (url: State) => void;
};

export const useSessionStore = create(
  persist<State & Action>(
    (set) => ({
      session_token: '',
      avatar: '',
      insertSessionToken: (state) =>
        set({ session_token: state.session_token }),
      insertAvatar: (state) => set({ avatar: state.avatar }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
