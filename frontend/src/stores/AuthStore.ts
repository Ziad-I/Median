import { createStore } from "zustand/vanilla";

export type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
};

export type AuthActions = {
  login: (token: string) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
};

export const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    login: (token: string) => set({ isLoggedIn: true, accessToken: token }),
    logout: () => set({ isLoggedIn: false, accessToken: null }),
  }));
};
