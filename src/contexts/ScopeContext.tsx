import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ScopeInfo {
  type: "subject" | "class" | null;
  id: string | null;
}

interface ScopeContextType {
  scope: ScopeInfo;
  setScope: (scope: ScopeInfo) => void;
  isInScope: boolean;
}

const ScopeContext = createContext<ScopeContextType | undefined>(undefined);

export const ScopeProvider = ({ children }: { children: ReactNode }) => {
  const [scope, setScope] = useState<ScopeInfo>({ type: null, id: null });

  return (
    <ScopeContext.Provider
      value={{
        scope,
        setScope,
        isInScope: scope.type !== null && scope.id !== null,
      }}
    >
      {children}
    </ScopeContext.Provider>
  );
};

export const useScope = () => {
  const context = useContext(ScopeContext);
  if (context === undefined) {
    throw new Error("useScope must be used within a ScopeProvider");
  }
  return context;
};
