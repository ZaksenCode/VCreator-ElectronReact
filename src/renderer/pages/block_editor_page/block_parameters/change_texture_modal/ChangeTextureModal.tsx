import './ChangeTextureModal.scss'
import { TextureMetadata } from '../../../../../types';

interface ChangeTextureModalProps {
  isOpen: boolean;
  textures: TextureMetadata[];
  onClose(): void;
  onSubmit(textureFile: TextureMetadata): void;
}

export default function ChangeTextureModal(
  { isOpen, onClose, textures, onSubmit }: ChangeTextureModalProps) {

  if (!isOpen) return null;

  return (<div className='change-texture-modal'>
    <div className='modal-content'>
      {textures.map((texture, index) => {
        return (
          <div key={index} className='texture' onClick={() => {onSubmit(texture)}}>
            <img src={texture.content}/>
            <label>{texture.name}</label>
          </div>
        )
      })}
      <button onClick={onClose}>Закрыть</button>
    </div>
  </div>);
}
