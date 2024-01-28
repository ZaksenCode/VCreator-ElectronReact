/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';
import { Directory, ModStructure, FileMetadata, TextureMetadata } from '../types';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}


export function readModStructure(currentPath: string): ModStructure {
  const contents = fs.readdirSync(currentPath, { withFileTypes: true });

  return contents.map((dirent) => {
    const fullPath = path.join(currentPath, dirent.name);

    if (dirent.isDirectory()) {
      return {
        name: dirent.name,
        type: 'directory',
        children: readModStructure(fullPath),
        path: fullPath
      } as Directory;
    } else {
      const extension = path.extname(dirent.name).toLowerCase();
      if (extension === '.png') {
        const content = fs.readFileSync(fullPath, 'base64');
        return {
          name: dirent.name,
          type: 'texture',
          content: `data:image/png;base64,${content}`,
          path: fullPath
        } as TextureMetadata;
      } else {
        return {
          name: dirent.name,
          type: 'file',
          path: fullPath
        } as FileMetadata;
      }
    }
  });
}

export function readFile(filePath: string): string | null {
  return fs.readFileSync(filePath, 'utf8')
}
