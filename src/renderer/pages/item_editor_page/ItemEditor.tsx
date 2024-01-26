import React, { useContext, useState } from 'react';
import './ItemEditor.scss';
import DirectoryView from '../../components/directory_view/DirectoryView';
import ItemParameters from './item_parameters/ItemParameters';
import Button, { ButtonType } from '../../components/button/Button';
import { ModContext } from '../../contexts/ModContext';
import { Item, Directory, File } from '../../../types';
import { findFileByPath } from '../../utils';
import BlockParameters from '../block_editor_page/block_parameters/BlockParameters';

export default function ItemEditor() {
  const modContext = useContext(ModContext);
  const modStructure = modContext?.modStructure;
  const items_dir: Directory | undefined = modStructure?.find((dir) =>
    dir.type == 'directory' && dir.name == 'items'
  ) as Directory | undefined;

  const updateItem = (updatedItem: Item) => {
    if (modContext?.selectedFile != null && modContext != null) {
      // TODO - логика обновления предмета

    }
  };

  return (
    <div className='item-editor'>
      <div className='container container-directory-column'>
        <Button onClick={() => {
        }} text='Создать предмет' type={ButtonType.Primary} />
        <div className='container container-directory-view'>
          {
            items_dir != undefined ?
              <DirectoryView
                directory={items_dir}
                selectedFile={modContext?.selectedFile ? modContext.selectedFile : null}
                onSelect={(file) => modContext?.setSelectedFile(file)}
              /> : 'Ошибка загрузки'
          }
        </div>
      </div>

      <div className='container container-item-parameters'>
        {
          modContext?.selectedFile == null ?
            <ItemDontSelected /> :
            <ItemParameters itemFile={modContext.selectedFile} onEdit={(item) => {
              updateItem(item);
            }} />
        }
      </div>
    </div>
  );
}

function ItemDontSelected() {
  return <div className='item-dont-selected'>
    <div>Предмет не выбран</div>
  </div>;
}

