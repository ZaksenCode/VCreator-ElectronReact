import './DirectoryView.scss';
import { Directory, File } from '../../../types';
import { useState } from 'react';

interface DirectoryViewProps {
  directory: Directory;

  onSelect(file: File): void;
}

/**
 * Компонент для отображения файлов и папок открыйто директории
 * @constructor
 */
export default function DirectoryView(
  { directory, onSelect }: DirectoryViewProps
) {
  const [selectedItem, setSelectedItem] = useState<Directory | File | null>(null);

  const handleItemClick = (item: Directory | File) => {
    setSelectedItem(item);
    if (item.type == 'file') {
      onSelect(item)
    }
  };

  return (
    <div className='directory-view'>
      {directory.children.map((child) => (
        <div
          role='button'
          tabIndex={0}
          key={`${child.name}_${child.type}`}
          className={`directory-item ${child.type} ${child === selectedItem ? 'selected' : ''}`}
          onClick={() => handleItemClick(child)}
        >
          {child.name}
        </div>
      ))}
    </div>
  );
}
