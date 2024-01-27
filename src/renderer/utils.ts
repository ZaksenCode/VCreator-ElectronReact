import { ModStructure, FileMetadata } from '../types';

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
