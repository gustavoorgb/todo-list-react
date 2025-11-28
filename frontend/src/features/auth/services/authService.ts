import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
}

const JWT_TOKEN_KEY = "jwt_token";

// Cria o contexto
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (token) setAuthHeader(token);
  }, []);

  const login = async (data: LoginDTO) => {
    const res = await api.post("/api/login", data);
    const token = res.data.token;
    if (token) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
      setAuthHeader(token);
      setUser(res.data.user);
    }
  };

  const register = async (data: RegisterDTO) => {
    await api.post("/api/register", data);
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};

// Axios header
const setAuthHeader = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
