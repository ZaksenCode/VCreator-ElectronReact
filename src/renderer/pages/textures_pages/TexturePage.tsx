import './TexturePage.scss';
import Button, { ButtonType } from '../../components/button/Button';
import DirectoryView from '../../components/directory_view/DirectoryView';
import React, { useContext, useState } from 'react';
import { ModContext } from '../../contexts/ModContext';
import { Directory } from '../../../types';
import TexturePreview from './texture_preview/TexturePreview';
import ImageDropZone from './ImageDropZone';

export default function TexturePage() {
  const modContext = useContext(ModContext);
  const modStructure = modContext?.modStructure;
  const [isBlockTextures, setIsBlockTextures] = useState(true)

  const textures_dir: Directory | undefined = modStructure?.find((dir) =>
    dir.type == 'directory' && dir.name == 'textures'
  ) as Directory | undefined;
  const textures_items_dir : Directory | undefined = textures_dir?.children?.find((dir) =>
    dir.type == 'directory' && dir.name == 'items'
  ) as Directory | undefined;
  const textures_blocks_dir : Directory | undefined = textures_dir?.children?.find((dir) =>
    dir.type == 'directory' && dir.name == 'blocks'
  ) as Directory | undefined;

  const onImageAdded = (imageData: { image: string | ArrayBuffer | null, name: string, extension: string }) => {
    if (imageData) {
      console.log(imageData)
    }
  }

  return (
    <div className='textures-page'>
      <div className='container container-directory-column'>
        <Button onClick={() => {
          setIsBlockTextures(!isBlockTextures)
        }} text={isBlockTextures ? "Блоки" : "Предметы"} type={ButtonType.Primary} />
        <div className='container container-directory-view'>
          {
            textures_blocks_dir != undefined && textures_items_dir != undefined?
              <DirectoryView
                directory={isBlockTextures ? textures_blocks_dir : textures_items_dir}
                viewType='all'
                selectedFile={modContext?.selectedFile ? modContext.selectedFile : null}
                onSelect={file => {modContext?.setSelectedFile(file)}}
                onRenameClick={file => {}}
              /> : 'Ошибка загрузки'
          }
        </div>
      </div>

      <div className='container'>
        <ImageDropZone onSave={onImageAdded}/>
        <div className='container-texture-view'>
          {
            modContext?.selectedFile == null ?
              <TextureDontSelected /> :
              <TexturePreview
                file={modContext.selectedFile}
              />
          }
        </div>
      </div>
    </div>
  );
}

function TextureDontSelected() {
  return <div className='texture-dont-selected'>
    <div>Текстура не выбрана</div>
  </div>;
}
