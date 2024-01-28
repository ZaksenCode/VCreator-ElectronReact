import './DirectoryView.scss';
import { Directory, FileMetadata, TextureMetadata } from '../../../types';
type DirectoryViewType =
  'json' |
  'lua' |
  'all'

interface DirectoryViewProps {
  directory: Directory;
  selectedFile: FileMetadata | null
  viewType: DirectoryViewType,
  onSelect(file: FileMetadata): void;
  onRenameClick(file: FileMetadata): void;
}

/**
 * Компонент для отображения файлов и папок открытой директории
 */
export default function DirectoryView(
  { directory, onSelect, selectedFile, viewType}: DirectoryViewProps
) {
  // Фильтр для отображения файлов / папок в списке по типу viewType
  const isItemVisible = (item: Directory | FileMetadata | TextureMetadata) => {
    if (viewType === 'all') {
      return true;
    }

    if (item.type === 'directory') {
      return true;
    }

    const fileExtension = item.name.split('.').pop();
    return viewType === fileExtension;
  };

  // Отображение имени файла без расширения. Для типа all показываем
  const getDisplayName = (item: Directory | FileMetadata| TextureMetadata) => {
    if (item.type === 'file' && viewType !== 'all') {
      return item.name.replace(/\.[^/.]+$/, ''); // Удаление расширения файла
    }
    return item.name;
  };

  // Обработка нажатий на файл / папку, колбекаем ток при типе - файл
  const handleItemClick = (item: Directory | FileMetadata| TextureMetadata) => {
    if (item.type == 'file') {
      onSelect(item)
    }
  };

  return (
    <div className='directory-view'>
      {directory.children
        .filter(isItemVisible)
        .map((child) => (
        <div
          role='button'
          tabIndex={0}
          key={`${child.name}_${child.type}`}
          className={`directory-item ${child.type} ${child === selectedFile ? 'selected' : ''}`}
          onClick={() => handleItemClick(child)}
        >
          {getDisplayName(child)}
          {/*<img className="rename-icon" src={renameIcon}  alt=""/>*/}
        </div>

      ))}
    </div>
  );
}
