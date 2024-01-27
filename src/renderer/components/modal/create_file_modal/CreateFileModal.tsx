import './CreateFileModal.scss';
import { useState } from 'react';


interface CreateFileModalProps {
  isOpen: boolean;
  title: string;
  defaultName: string;

  onClose(): void;

  onSubmit(fileName: string): void;
}

export default function CreateFileModal(
  { isOpen, onClose, title, onSubmit, defaultName }: CreateFileModalProps) {
  const [name, setName] = useState(defaultName || '');

  if (!isOpen) return null;
  const handleSubmit = () => {
    onSubmit(name);
    onClose();
  };
  return (<div className='modal'>
    <div className='modal-content'>
      <h2>{title}</h2>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Введите имя'
      />
      <button onClick={handleSubmit}>Подтвердить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  </div>);
}
