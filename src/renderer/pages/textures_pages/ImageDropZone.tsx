interface ImageDropZoneProps {
  onSave(imageData: { image: string | ArrayBuffer | null, name: string, extension: string }): void;
}
export default function ImageDropZone({onSave}: ImageDropZoneProps) {
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const extension = file.name.split('.').pop() || '';
        event.target?.result && onSave({
          image: event.target?.result,
          name: file.name,
          extension: extension
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="image-drop-zone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      Для добавления текстуры, перенесите ее сюда
    </div>
  );
};

