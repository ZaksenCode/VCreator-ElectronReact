import './DirectoryView.scss';
import { Directory, File } from '../../../types';
import { useState } from 'react';

interface DirectoryViewProps {
  directory: Directory;
  selectedFile: File | null
  onSelect(file: File): void;
}

/**
 * Компонент для отображения файлов и папок открыйто директории
 * @constructor
 */
export default function DirectoryView(
  { directory, onSelect, selectedFile}: DirectoryViewProps
) {

  const handleItemClick = (item: Directory | File) => {
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
          className={`directory-item ${child.type} ${child === selectedFile ? 'selected' : ''}`}
          onClick={() => handleItemClick(child)}
        >
          {child.name}
        </div>
      ))}
    </div>
  );
}
