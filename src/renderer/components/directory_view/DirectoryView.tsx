import './DirectoryView.scss';

// interface DirectoryViewProps {
//   directory: Directory;
//
//   onSelect(file: File): void;
// }

/**
 * Компонент для отображения файлов и папок открыйто директории
 * @constructor
 */
export default function DirectoryView(
  // { directory, onSelect }: DirectoryViewProps
) {
  const items = ['Блок', 'Блок2', 'Блок3', 'Блок', 'Блок2', 'Блок3', 'Блок', 'Блок2', 'Блок3', 'Блок', 'Блок2', 'Блок3', 'Блок', 'Блок2', 'Блок3', 'Блок', 'Блок2', 'Блок3', 'Блок', 'Блок2', 'Блок3', 'Блок', 'Блок2', 'Блок3'];
  return (
    <div className='directory-view'>
      {items.map((item) => (
        <div key={item} className='file'>
          {item}
        </div>
      ))}
    </div>
  );
}
