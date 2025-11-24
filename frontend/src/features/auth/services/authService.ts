import { api } from "../../api";

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
const JWT_TOKEN_KEY = 'jwt_token';

export async function register(data: RegisterDTO) {
  const response = await api.post("/api/register", data);
  return response.data;
}

export async function login(data: LoginDTO) {
    const response = await api.post("/api/login", data);
    const token = response.data.token;
    if(token){
      localStorage.setItem(JWT_TOKEN_KEY, token);

      setAuthHeader(token);
    }

    return response.data;

}
// ----------------------------------------------------
// Funções Auxiliares para Autenticação
// ----------------------------------------------------

/**
 * Define o cabeçalho de Autorização no Axios para requisições futuras.
 */
export const setAuthHeader = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Remove o token e limpa o cabeçalho de Autorização.
 */
export const logout = () => {
  localStorage.removeItem(JWT_TOKEN_KEY);
  delete api.defaults.headers.common['Authorization'];
};

/**
 * Verifica se o usuário está autenticado.
 */
export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem(JWT_TOKEN_KEY);
};


// Tenta configurar o cabeçalho de Autorização ao carregar o módulo,
// caso o token já esteja no localStorage (após um refresh de página)
const storedToken = localStorage.getItem(JWT_TOKEN_KEY);
if (storedToken) {
    setAuthHeader(storedToken);
}
