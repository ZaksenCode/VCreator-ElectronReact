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

export interface File {
  name: string;
  type: 'file';
  content: string;
  path: string;
}

export interface Directory {
  name: string;
  type: 'directory';
  children: (File | Directory)[];
  path: string;
}

export type ModStructure = (File | Directory)[];
