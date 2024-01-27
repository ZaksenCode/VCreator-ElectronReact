import React, { useContext, useEffect, useRef, useState } from 'react';
import { ModContext } from '../../contexts/ModContext';
import Button, { ButtonType } from '../../components/button/Button';
import ModInfo from './mod_info/ModInfo';
import './ModSelectPage.scss';
import { parseJson } from '../../utils';
import { ModPackage } from '../../../types';

export default function ModSelectPage() {
  const modContext = useContext(ModContext)!;
  const [modInfo, setModInfo] = useState<ModPackage | null>(null);
  useEffect(() => {
    const structure = modContext.modStructure;
    structure?.forEach(item => {
      if (item.type != 'file' || item.name != 'package.json') return;
      modContext?.loadFileContent(item.path).then(fileContent =>
        fileContent && setModInfo(parseJson<ModPackage>(fileContent))
      );
    });
  }, [modContext.modStructure]);

  const readModStructure = async (dirPath: string) => {
    const structure =
      await window.electron.ipcRenderer.invokeReadModStructure(dirPath);
    modContext?.setModStructure(structure);
  };

  const openFolderDialog = async () => {
    const paths = await window.electron.ipcRenderer.invokeOpenDirectoryDialog();
    if (paths && paths.length > 0) {
      const modPath = paths[0];
      try {
        await readModStructure(modPath);
        modContext?.setModPath(modPath);
        const modName = modPath.split('/').pop();
        if (modName) modContext?.setModName(modName);
      } catch (e) {
        console.error('Error parsing mod');
      }
    }
  };

  return (
    <div className='mod-select-page'>
      {
        modInfo &&
        <div className='container'>
          <ModInfo
            version={modInfo.version || "Отсутствует" }
            author={modInfo.creator || "Отсутствует"}
            description={modInfo.description || "Отсутствует"}
            tags='none'
          />
        </div>
      }
      <div className='mod-actions'>
        <div className='button-group'>
          <Button
            text='Версия'
            onClick={() => {
              console.log('Verison');
            }}
            type={ButtonType.Primary}
          />
          <Button
            text='Автор'
            onClick={() => {
              console.log('Author');
            }}
            type={ButtonType.Primary}
          />
          <Button
            text='Описание'
            onClick={() => {
              console.log('Description');
            }}
            type={ButtonType.Primary}
          />
          <Button
            text='Теги'
            onClick={() => {
              console.log('Tags');
            }}
            type={ButtonType.Primary}
          />
        </div>
        <div className='container action-info'>
          Данная вкладка в разработке и не выполняет никакого функционала!
        </div>
      </div>
      <div className='spacer' />
      <Button
        text='Загрузить контент пак'
        onClick={openFolderDialog}
        type={ButtonType.Primary}
      />

    </div>
  );
}
