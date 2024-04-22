import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  session_token: string;
};

type Action = {
  insertSessionToken: (values: State) => void;
};

export const useSessionStore = create(
  persist<State & Action>(
    (set) => ({
      session_token: '',
      insertSessionToken: (state) =>
        set({ session_token: state.session_token }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
