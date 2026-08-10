import { createContext, useContext, useState, ReactNode } from "react";
import apiClient from "../services/apiClient";
import { ENDPOINTS } from "../services/endpoints";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// 1. Inisialisasi Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Cek status autentikasi awal berdasarkan keberadaan token
    return !!localStorage.getItem("token");
  });

  // 2. Fungsi Login
  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      console.log("Mengirim data login ke server...");

      // Kirim via query parameters sesuai ekspektasi endpoint FastAPI kamu
      const response = await apiClient.post(ENDPOINTS.LOGIN, null, {
        params: { username, password },
      });

      if (response.data && response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("username", username);
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error: any) {
      console.error(
        "Gagal Login ke Backend!",
        error.response?.data || error.message,
      );
      setIsAuthenticated(false);
      return false;
    }
  };

  // 3. Fungsi Logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
