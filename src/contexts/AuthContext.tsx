import { createContext, useCallback, useContext, useState } from "react";

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
