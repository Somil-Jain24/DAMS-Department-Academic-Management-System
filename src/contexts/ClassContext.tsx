import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ClassInfo {
  id: string;
  name: string;
  department: string;
  year: number;
}

interface ClassContextType {
  selectedClass: ClassInfo | null;
  setSelectedClass: (classInfo: ClassInfo | null) => void;
  isInClassContext: boolean;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const ClassProvider = ({ children }: { children: ReactNode }) => {
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

  return (
    <ClassContext.Provider
      value={{
        selectedClass,
        setSelectedClass,
        isInClassContext: selectedClass !== null,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => {
  const context = useContext(ClassContext);
  if (context === undefined) {
    throw new Error("useClass must be used within a ClassProvider");
  }
  return context;
};
