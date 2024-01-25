import React, { useContext, useState } from 'react';
import './BlockEditor.scss';
import DirectoryView from '../../components/directory_view/DirectoryView';
import BlockParameters from './block_parameters/BlockParameters';
import Button, { ButtonType } from '../../components/button/Button';
import { ModContext } from '../../contexts/ModContext';
import { Directory, File } from '../../../types';

export default function BlockEditor() {
  const modContext = useContext(ModContext);
  const modStructure = modContext?.modStructure;
  const blocks_dir: Directory | undefined = modStructure?.find((dir) =>
    dir.type == 'directory' && dir.name == 'blocks'
  ) as Directory | undefined;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
                onSelect={(file) => setSelectedFile(file)}
              /> : 'Ошибка загрузки'
          }
        </div>
      </div>

      <div className='container container-block-parameters'>
        {
          selectedFile == null ?
            <BlockDontSelected/> :
            <BlockParameters />
        }
      </div>
    </div>
  );
}

function BlockDontSelected() {
  return <div className="block-dont-selected">
    <div>Блок не выбран</div>
  </div>
}
