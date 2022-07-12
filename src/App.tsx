import RoutesAPP from "./routes";
import { ToastContainer } from "react-toastify";

import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { InventoryProvider } from "./contexts/InventoryContext";

import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <>
      <AuthProvider>
        <SidebarProvider>
          <InventoryProvider>
            <RoutesAPP />
          </InventoryProvider>
        </SidebarProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
