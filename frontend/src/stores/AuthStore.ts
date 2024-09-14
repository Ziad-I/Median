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

const persistState = (state: AuthState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authState", JSON.stringify(state));
  }
};

const getPersistedState = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedState = localStorage.getItem("authState");
    return storedState ? JSON.parse(storedState) : defaultState;
  }
  return defaultState;
};

export const createAuthStore = (initState: AuthState = getPersistedState()) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    login: (token: string) => {
      const decoded = jwtDecode<JwtPayload>(token);
      const newState = {
        isLoggedIn: true,
        userId: decoded.userId,
        accessToken: token,
      };
      set(newState);
      persistState(newState);
    },
    logout: () => {
      const newState = { isLoggedIn: false, userId: null, accessToken: null };
      set(newState);
      persistState(newState);
    },
  }));
};
