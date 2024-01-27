import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useMemo
} from 'react';
import { FileMetadata, ModStructure } from '../../types';

interface ModContextType {
  modStructure: ModStructure | null;
  modPath: string | null;
  modName: string | null;
  selectedFile: FileMetadata | null;
  contentFile: string | null;
  setModStructure: Dispatch<SetStateAction<ModStructure | null>>;
  setModPath: Dispatch<SetStateAction<string | null>>;
  setModName: Dispatch<SetStateAction<string | null>>;
  setSelectedFile: Dispatch<SetStateAction<FileMetadata | null>>;
  setContentFile: Dispatch<SetStateAction<string | null>>;
  // Other
  loadFileContent: (filePath: string) => Promise<string | null>;
  addNewFile: (filePath: string, content: string) => Promise<boolean>;
}

export const ModContext = createContext<ModContextType | null>(null);

interface ModProviderProps {
  children: ReactNode;
}

export function ModProvider({ children }: ModProviderProps) {
  const [modStructure, setModStructure] = useState<ModStructure | null>(null);
  const [modPath, setModPath] = useState<string | null>(null);
  const [modName, setModName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);
  const [contentFile, setContentFile] = useState<string | null>(null);

  const loadFileContent = (filePath: string): Promise<string | null> => {
    return window.electron.ipcRenderer.invokeLoadFileContent(filePath);
  };

  const addNewFile = (filePath: string, fileContent: string): Promise<boolean> => {
    return window.electron.ipcRenderer.invokeSaveFileContent(filePath, fileContent);
  };

  const contextValue = useMemo(
    () => ({
      modStructure,
      setModStructure,
      modPath,
      setModPath,
      modName,
      setModName,
      selectedFile,
      setSelectedFile,
      contentFile,
      setContentFile,
      // Other
      loadFileContent,
      addNewFile
    }),
    [
      modStructure, setModStructure,
      modPath, setModPath,
      modName, setModName,
      selectedFile, setSelectedFile,
      contentFile, setContentFile,
      loadFileContent,
      addNewFile
    ]
  );

  return (
    <ModContext.Provider value={contextValue}>{children}</ModContext.Provider>
  );
}

