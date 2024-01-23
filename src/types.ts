export interface File {
  name: string;
  type: 'file';
  content: string;
}

export interface Directory {
  name: string;
  type: 'directory';
  children: (File | Directory)[];
}

export type ModStructure = (File | Directory)[];
