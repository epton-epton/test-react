import React, { createContext, useContext, ReactNode } from 'react';

interface ModelContextProps {
  modelName: string;
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export const ModelProvider = ({ modelName, children }: { modelName: string, children: ReactNode }) => {
  return (
    <ModelContext.Provider value={{ modelName }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
};
