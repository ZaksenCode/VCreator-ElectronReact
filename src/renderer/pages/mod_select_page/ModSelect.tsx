import { useContext, useRef, useState } from 'react';
import { ModContext } from '../../contexts/ModContext';
import Button, { ButtonType } from '../../components/button/Button';

export default function ModSelect() {
  const { setModStructure, setModPath, setModName } = useContext(ModContext)!;
  const readModStructure = async (dirPath: string) => {
    const structure =
      await window.electron.ipcRenderer.invokeReadModStructure(dirPath);
    setModStructure(structure);
  };
  const openFolderDialog = async () => {
    const paths = await window.electron.ipcRenderer.invokeOpenDirectoryDialog();
    if (paths && paths.length > 0) {
      const modPath = paths[0];
      try {
        await readModStructure(modPath);
        setModPath(modPath);
        const modName = modPath.split('/').pop();
        if (modName) setModName(modName);
      } catch (e) {
        console.error('Error parsing mod');
      }
    }
  };

  return (
    <div>
      <Button
        onClick={() => openFolderDialog()}
        type={ButtonType.Primary}
        text="Загрузить контент-пак"
      />
    </div>
  );
}
