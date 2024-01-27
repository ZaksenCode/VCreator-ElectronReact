import React, { useContext, useState } from 'react';
import './BlockEditor.scss';
import DirectoryView from '../../components/directory_view/DirectoryView';
import BlockParameters from './block_parameters/BlockParameters';
import Button, { ButtonType } from '../../components/button/Button';
import { ModContext } from '../../contexts/ModContext';
import { Block, Directory } from '../../../types';
import { findFileByPath } from '../../utils';

export default function BlockEditor() {
  const modContext = useContext(ModContext);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const modStructure = modContext?.modStructure;
  const blocks_dir: Directory | undefined = modStructure?.find((dir) =>
    dir.type == 'directory' && dir.name == 'blocks'
  ) as Directory | undefined;

  const updateBlock = async (updatedBlock: Block) => {
    if (modContext?.selectedFile != null && modContext != null) {
      const filePath = modContext.selectedFile.path;
      // Получем обновленный контент блока и конвертим в строку
      const jsonContent = JSON.stringify(updatedBlock, null, 2);
      const isSaved = await window.electron.ipcRenderer.invokeSaveFileContent(filePath, jsonContent);
      if (!isSaved) {
        // TODO Показывает алерт с ошибкой записи
        return;
      }

      // Если успешно сохранили файл, то нужно обновить BlockParameters для повторной загрузки контента блока
      setLastUpdated(Date.now());
    }
  };

  return (
    <div className='block-editor'>
      <div className='container container-directory-column'>
        <Button onClick={() => {
        }} text='Создать блок' type={ButtonType.Primary} />
        <div className='container container-directory-view'>
          {
            blocks_dir != undefined ?
              <DirectoryView
                directory={blocks_dir}
                viewType='json'
                selectedFile={modContext?.selectedFile ? modContext.selectedFile : null}
                onSelect={(file) => modContext?.setSelectedFile(file)}
              /> : 'Ошибка загрузки'
          }
        </div>
      </div>

      <div className='container container-block-parameters'>
        {
          modContext?.selectedFile == null ?
            <BlockDontSelected /> :
            <BlockParameters
              key={lastUpdated}
              blockFile={modContext.selectedFile}
              onEdit={async (block) => updateBlock(block)}
            />
        }
      </div>
    </div>
  );
}

function BlockDontSelected() {
  return <div className='block-dont-selected'>
    <div>Блок не выбран</div>
  </div>;
}
