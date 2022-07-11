import { createContext, useContext, useState } from "react";

type SidebarContextData = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext({} as SidebarContextData);

type SidebarProviderProps = {
  children: React.ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextData {
  return useContext(SidebarContext);
}
