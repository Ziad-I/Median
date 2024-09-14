import { createStore } from "zustand/vanilla";
import { jwtDecode } from "jwt-decode";

export type AuthState = {
  isLoggedIn: boolean;
  userId: string | null;
  accessToken: string | null;
};

export type AuthActions = {
  login: (token: string) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultState: AuthState = {
  isLoggedIn: false,
  userId: null,
  accessToken: null,
};

interface JwtPayload {
  userId: string;
}

export const createAuthStore = (initState: AuthState = defaultState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    login: (token: string) => {
      const decoded = jwtDecode<JwtPayload>(token);
      set({ isLoggedIn: true, userId: decoded.userId, accessToken: token });
    },
    logout: () => set({ isLoggedIn: false, userId: null, accessToken: null }),
  }));
};
