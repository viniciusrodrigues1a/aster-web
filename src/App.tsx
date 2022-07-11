import RoutesAPP from "./routes";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { InventoryProvider } from "./contexts/InventoryContext";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <InventoryProvider>
          <RoutesAPP />
        </InventoryProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
