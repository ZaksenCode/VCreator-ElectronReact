import React, { useContext, useState } from 'react';
import './BlockEditor.scss';
import DirectoryView from '../../components/directory_view/DirectoryView';
import BlockParameters from './block_parameters/BlockParameters';
import Button, { ButtonType } from '../../components/button/Button';
import { ModContext } from '../../contexts/ModContext';
import { Block, Directory, File } from '../../../types';
import { findFileByPath } from '../../utils';

export default function BlockEditor() {
  const modContext = useContext(ModContext);
  const modStructure = modContext?.modStructure;
  const blocks_dir: Directory | undefined = modStructure?.find((dir) =>
    dir.type == 'directory' && dir.name == 'blocks'
  ) as Directory | undefined;

  const updateBlock = (updatedBlock: Block) => {
    if (modContext?.selectedFile != null && modContext != null) {
      window.electron.ipcRenderer.invokeSaveFileChanges(modContext?.selectedFile.path, updatedBlock)
        .then(result => {
          if (result && modContext.modPath != null) {
            // TODO Показать индикатор загрузки или сообщение о начале обновления структуры мода
            window.electron.ipcRenderer.invokeReadModStructure(modContext.modPath)
              .then(structure => {
                if (structure == null || modContext.selectedFile == null) return
                const updatedSelectedFile = findFileByPath(structure, modContext.selectedFile.path);
                modContext.setModStructure(structure);
                if (updatedSelectedFile) {
                  modContext.setSelectedFile(updatedSelectedFile);
                }

                // TODO  Скрыть индикатор загрузки или показать сообщение об успешном обновлении
              })
              .catch(error => {
                // TODO  Обработка ошибок при чтении структуры мода
              });
          }
        })
        .catch(error => {
          // TODO Обработка ошибок при сохранении файла
        });
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
            <BlockParameters blockFile={modContext.selectedFile} onEdit={(block) => {
              updateBlock(block);
            }} />
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
