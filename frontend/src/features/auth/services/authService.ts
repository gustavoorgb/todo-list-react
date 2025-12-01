import { createContext, useContext,} from "react";
import { api } from "../../api";

export interface User { id: number; name: string; email: string; password: string }
export interface LoginDTO { email: string; password: string }
export interface RegisterDTO { name: string; email: string; password: string }

export interface AuthContextData {
  user: User | null;
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  register: (data: RegisterDTO) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;

}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};

// Axios header
export const setAuthHeader = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
