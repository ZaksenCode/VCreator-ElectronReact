export interface Block {
  "texture": string,
  "draw-group": number,
  "light-passing": boolean
}

export interface Item {
  "icon-type": string,
  "icon": string,
  "placing-block": string,
  "emission": number[],
  "stack-size": number
}

export interface FileMetadata {
  name: string;
  type: 'file';
  path: string;
}

export interface Directory {
  name: string;
  type: 'directory';
  children: (FileMetadata | Directory)[];
  path: string;
}

export type ModStructure = (FileMetadata | Directory)[];
