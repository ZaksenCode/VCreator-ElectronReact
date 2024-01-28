import { ModStructure, FileMetadata, TextureMetadata, Directory } from '../types';

export function parseJson<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Ошибка при парсинге JSON:", error);
    return null;
  }
}


export function findFileByPath(modStructure: ModStructure, path: string): FileMetadata | null {
  function search(structure: ModStructure): FileMetadata | null {
    for (const item of structure) {
      if (item.type === 'file' && item.path === path) {
        return item;
      } else if (item.type === 'directory') {
        const found = search(item.children);
        if (found) return found;
      }
    }
    return null;
  }

  return search(modStructure);
}


export function getBlockTextures(modStructure: ModStructure): TextureMetadata[] {
  const result: TextureMetadata[] = [];
  const textures_dir: Directory | undefined = modStructure.find((dir) =>
    dir.type === 'directory' && dir.name === 'textures'
  ) as Directory | undefined;

  const textures_blocks_dir: Directory | undefined = textures_dir?.children?.find((dir) =>
    dir.type === 'directory' && dir.name === 'blocks'
  ) as Directory | undefined;

  textures_blocks_dir?.children.forEach((file) => {
    if (file.type === "texture") {
      result.push(file as TextureMetadata);
    }
  });
  return result;
}
