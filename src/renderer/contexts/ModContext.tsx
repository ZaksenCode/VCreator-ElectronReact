import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useMemo
} from 'react';
import { File, ModStructure } from '../../types';

interface ModContextType {
  modStructure: ModStructure | null;
  modPath: string | null;
  modName: string | null;
  selectedFile: File | null;
  setModStructure: Dispatch<SetStateAction<ModStructure | null>>;
  setModPath: Dispatch<SetStateAction<string | null>>;
  setModName: Dispatch<SetStateAction<string | null>>;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  // updateFileInModStructure(fileName: string, fileContent: Block): void
}

export const ModContext = createContext<ModContextType | null>(null);

interface ModProviderProps {
  children: ReactNode;
}

export function ModProvider({ children }: ModProviderProps) {
  const [modStructure, setModStructure] = useState<ModStructure | null>(null);
  const [modPath, setModPath] = useState<string | null>(null);
  const [modName, setModName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Использование useMemo для мемоизации объекта контекста
  const contextValue = useMemo(
    () => ({
      modStructure,
      setModStructure,
      modPath,
      setModPath,
      modName,
      setModName,
      selectedFile,
      setSelectedFile
    }),
    [modStructure, setModStructure, modPath, setModPath, modName, setModName, selectedFile, setSelectedFile]
  );

  return (
    <ModContext.Provider value={contextValue}>{children}</ModContext.Provider>
  );
}

