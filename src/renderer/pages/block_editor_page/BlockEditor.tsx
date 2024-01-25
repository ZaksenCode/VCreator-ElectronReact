import React from 'react';
import './BlockEditor.scss';
import DirectoryView from '../../components/directory_view/DirectoryView';
import BlockParameters from './block_parameters/BlockParameters';
import Button, { ButtonType } from '../../components/button/Button';

export default function BlockEditor() {
  return (
    <div className='block-editor'>
      <div className="container container-directory-column">
        <Button onClick={() => {}} text="Создать блок" type={ButtonType.Primary}/>
        <div className='container container-directory-view'>
          <DirectoryView />
        </div>
      </div>

      <div className='container container-block-parameters'>
        <BlockParameters />
      </div>
    </div>
  );
}
