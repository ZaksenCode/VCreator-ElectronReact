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
  setModStructure: Dispatch<SetStateAction<ModStructure | null>>;
  setModPath: Dispatch<SetStateAction<string | null>>;
  setModName: Dispatch<SetStateAction<string | null>>;
  setSelectedFile: Dispatch<SetStateAction<FileMetadata | null>>;
  // Other
  loadFileContent: (filePath: string) => Promise<string | null>;
  // saveFileContent: (filePath: string, content: string) => Promise<boolean>;
}

export const ModContext = createContext<ModContextType | null>(null);

interface ModProviderProps {
  children: ReactNode;
}

export function ModProvider({ children }: ModProviderProps) {
  const [modStructure, setModStructure] = useState<ModStructure | null>(null);
  const [modPath, setModPath] = useState<string | null>(null);
  const [modName, setModName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null)

  const loadFileContent = (filePath: string): Promise<string | null>=> {
    return window.electron.ipcRenderer.invokeLoadFileContent(filePath);
  };

  // const saveFileContent = (filePath: string, fileContent: string): Promise<boolean> => {
  //
  // }

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
      // Other
      loadFileContent
    }),
    [modStructure, setModStructure, modPath, setModPath, modName, setModName, selectedFile, setSelectedFile, loadFileContent]
  );

  return (
    <ModContext.Provider value={contextValue}>{children}</ModContext.Provider>
  );
}

