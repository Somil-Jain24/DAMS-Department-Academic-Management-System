import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SubjectInfo {
  id: string;
  name: string;
  code: string;
}

interface SubjectContextType {
  selectedSubject: SubjectInfo | null;
  setSelectedSubject: (subject: SubjectInfo | null) => void;
  isInSubjectContext: boolean;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo | null>(null);

  return (
    <SubjectContext.Provider
      value={{
        selectedSubject,
        setSelectedSubject,
        isInSubjectContext: selectedSubject !== null,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (context === undefined) {
    throw new Error("useSubject must be used within a SubjectProvider");
  }
  return context;
};
