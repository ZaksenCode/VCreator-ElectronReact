import React, { useContext, useState } from 'react';
import './BlockEditor.scss';
import DirectoryView from '../../components/directory_view/DirectoryView';
import BlockParameters from './block_parameters/BlockParameters';
import Button, { ButtonType } from '../../components/button/Button';
import { ModContext } from '../../contexts/ModContext';
import { Block, Directory, FileMetadata } from '../../../types';
import CreateFileModal from '../../components/modal/create_file_modal/CreateFileModal';

export default function BlockEditor() {
  const modContext = useContext(ModContext);

  const [isCreateBlockModalOpen, setCreateBlockModalOpen] = useState(false);

  const modStructure = modContext?.modStructure;
  const blocks_dir: Directory | undefined = modStructure?.find((dir) =>
    dir.type == 'directory' && dir.name == 'blocks'
  ) as Directory | undefined;

  const updateBlock = async (updatedBlock: Block) => {
    if (modContext?.selectedFile != null && modContext != null) {
      const filePath = modContext.selectedFile.path;
      // Получем обновленный контент блока и конвертим в строку
      const jsonContent = JSON.stringify(updatedBlock, (key, value) => {
        if (value === null) {
          return undefined; // Пропуск свойств с null
        }
        return value;
      }, 2);
      const isSaved = await window.electron.ipcRenderer.invokeSaveFileContent(filePath, jsonContent);
      if (!isSaved) {
        // TODO Показывает алерт с ошибкой записи
        return;
      }
      modContext.setContentFile(jsonContent);
    }
  };

  const selectFile = async (selectedFile: FileMetadata) => {
    modContext?.setSelectedFile(selectedFile);
    modContext?.loadFileContent(selectedFile.path).then(content => {
      content && modContext?.setContentFile(content);
    });
  };

  const handleCreateBlockModalSubmit = async (newName: string) => {
    const filePath = `${blocks_dir?.path}/${newName}.json`;
    const newBlock: Block = {
      "draw-group": null,
      "light-passing": null,
      "model-primitives": null,
      "picking-item": null,
      "sky-light-passing": null,
      "texture-faces": null,
      breakable: null,
      grounded: null,
      hidden: null,
      hitbox: null,
      model: null,
      obstacle: null,
      replaceable: null,
      rotation: null,
      selectable: null,
      texture: null
    };
    const jsonContent = JSON.stringify(newBlock, null, 2);
    const resultAddFile = await modContext?.addNewFile(filePath, jsonContent);
    if (!resultAddFile || !modContext?.modPath) {
      // TODO показываем ошибку добавления блока
      return;
    }

    const structure =
      await window.electron.ipcRenderer.invokeReadModStructure(modContext.modPath);
    modContext.setModStructure(structure);
  };


  return (
    <div className='block-editor'>
      <div className='container container-directory-column'>
        <Button onClick={() => {
          setCreateBlockModalOpen(true);
        }} text='Создать блок' type={ButtonType.Primary} />
        <div className='container container-directory-view'>
          {
            blocks_dir != undefined ?
              <DirectoryView
                directory={blocks_dir}
                viewType='json'
                selectedFile={modContext?.selectedFile ? modContext.selectedFile : null}
                onSelect={selectFile}
                onRenameClick={file => {
                }}
              /> : 'Ошибка загрузки'
          }
        </div>
      </div>

      <div className='container container-block-parameters'>
        {
          modContext?.selectedFile == null ?
            <BlockDontSelected /> :
            <BlockParameters
              // key={lastUpdated}
              blockFile={modContext.selectedFile}
              onEdit={async (block) => updateBlock(block)}
            />
        }
      </div>
      <CreateFileModal
        isOpen={isCreateBlockModalOpen}
        onClose={() => setCreateBlockModalOpen(false)}
        title={'Создать блок'}
        onSubmit={handleCreateBlockModalSubmit}
        defaultName={''}
      />
    </div>
  );
}

function BlockDontSelected() {
  return <div className='block-dont-selected'>
    <div>Блок не выбран</div>
  </div>;
}
