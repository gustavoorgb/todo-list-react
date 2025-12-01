import {useState, useEffect} from 'react'
import type {ReactNode} from 'react'
import {AuthContext, setAuthHeader} from '../services/authService'
import type {User, LoginDTO, RegisterDTO} from '../services/authService'
import { api } from "../../api";

const JWT_TOKEN_KEY = "jwt_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

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

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    if (token) {
        setAuthHeader(token);

    api.get("/api/user")
      .then(res => setUser(res.data))
      .catch(() => logout())
      .finally(() => setLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading , isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};