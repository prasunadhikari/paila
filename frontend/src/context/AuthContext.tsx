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
  updateProfile as updateProfileApi,
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

  updateUser: (
    name: string,
    phone: string
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/* =========================================================
   GET STORED TOKEN
========================================================= */

function getStoredToken(): string | null {
  return (
    localStorage.getItem("paila_token") ||
    sessionStorage.getItem("paila_token")
  );
}

/* =========================================================
   AUTH PROVIDER
========================================================= */

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD CURRENT USER
  ======================================================= */

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

  /* =======================================================
     LOGIN
  ======================================================= */

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
      localStorage.setItem(
        "paila_token",
        response.token
      );

      sessionStorage.removeItem("paila_token");
    } else {
      sessionStorage.setItem(
        "paila_token",
        response.token
      );

      localStorage.removeItem("paila_token");
    }

    setUser(response.user);
  }

  /* =======================================================
     UPDATE USER
  ======================================================= */

  async function updateUser(
    name: string,
    phone: string
  ) {
    const token = getStoredToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await updateProfileApi(
      token,
      name,
      phone
    );

    setUser(response.user);
  }

  /* =======================================================
     LOGOUT
  ======================================================= */

  function logout() {
    localStorage.removeItem("paila_token");
    sessionStorage.removeItem("paila_token");

    setUser(null);
  }

  /* =======================================================
     PROVIDER
  ======================================================= */

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================================================
   USE AUTH
========================================================= */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}