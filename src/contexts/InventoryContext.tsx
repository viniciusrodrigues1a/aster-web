import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";

type Inventory = {
  id: string;
  expenses: { description: string; id: string; title: string; value: number }[];
  transactions: { description: string; id: string; value_paid: number }[];
  products: {
    description: string;
    title: string;
    id: string;
    image: {
      base64: string;
      mimeType: string;
    } | null;
    quantity: number;
    purchase_price: number;
    sale_price: number;
  }[];
};

type InventoryContextData = {
  inventory: Inventory;
  refetch: () => Promise<void>;
};

const InventoryContext = createContext({} as InventoryContextData);

type InventoryProviderProps = {
  children: React.ReactNode;
};

export function InventoryProvider({ children }: InventoryProviderProps) {
  const { email, token } = useAuthContext();
  const [inventory, setInventory] = useState<Inventory>({
    id: "",
    expenses: [],
    transactions: [],
    products: [],
  });

  const refetch = useCallback(async () => {
    if (!token) return;

    const raw = await fetch(`http://localhost:8080/inventories/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = await raw.json();
    setInventory(res);
  }, [token, email]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <InventoryContext.Provider value={{ inventory, refetch }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory(): InventoryContextData {
  return useContext(InventoryContext);
}
