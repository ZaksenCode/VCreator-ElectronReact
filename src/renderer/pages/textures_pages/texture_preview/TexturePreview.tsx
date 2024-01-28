import './TexturePreview.scss';
import { FileMetadata } from '../../../../types';
import { useEffect, useRef, useState } from 'react';


interface TexturePreviewProps {
  file: FileMetadata;
}

export default function TexturePreview({ file }: TexturePreviewProps)  {
  const [textureData, setTextureData] = useState('');

  useEffect(() => {
    const loadTexture = async () => {
      if (!file) return;

      try {
        const data = await window.electron.ipcRenderer.loadTexture(file.path);
        setTextureData(data);
      } catch (error) {
        console.error('Error loading texture:', error);
      }
    };

    loadTexture();
  }, [file]);

  return textureData && <img src={textureData} alt='Texture' />;
};

