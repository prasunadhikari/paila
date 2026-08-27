import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getCurrentUser,
  login as loginApi,
  type User,
} from "../api/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredToken(): string | null {
  return (
    localStorage.getItem("paila_token") ||
    sessionStorage.getItem("paila_token")
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = getStoredToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(token);
        setUser(response.user);
      } catch {
        localStorage.removeItem("paila_token");
        sessionStorage.removeItem("paila_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(
    email: string,
    password: string,
    rememberMe: boolean
  ) {
    const response = await loginApi(email, password);

    if (!response.token) {
      throw new Error("Login token was not received");
    }

    if (rememberMe) {
      localStorage.setItem("paila_token", response.token);
      sessionStorage.removeItem("paila_token");
    } else {
      sessionStorage.setItem("paila_token", response.token);
      localStorage.removeItem("paila_token");
    }

    setUser(response.user);
  }

  function logout() {
    localStorage.removeItem("paila_token");
    sessionStorage.removeItem("paila_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}