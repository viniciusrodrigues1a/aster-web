import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";

type AuthContextData = {
  signIn: (email: string, password: string) => void;
  token: string | null;
  email: string | null;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    const raw = await fetch("http://localhost:8080/sessions", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const isStatus2xx = raw.status.toString().startsWith("2");
    if (!isStatus2xx) {
      const message = await raw.text();
      toast(message, { type: "error" });
      return;
    }

    const isStatus5xx = raw.status.toString().startsWith("5");
    if (isStatus5xx) {
      toast("unexpected error when logging in", { type: "error" });
      return;
    }

    const response = await raw.json();

    setEmail(email);
    setToken(response.token);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, token, email }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextData {
  return useContext(AuthContext);
}
