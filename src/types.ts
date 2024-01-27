export interface ModPackage {
  id: string | null,
  title: string | null,
  creator: string | null,
  version: string | null,
  description: string | null
}


export type BlockModelType =
  'aabb' |
  'X' |
  'custom' |
  'none'

export type BlockRotation =
  'none' |
  'pipe' |
  'pane'

export type AABBPrimitive  = [
  number, // offsetX
  number, // offsetY
  number, // offsetZ
  number, // sizeX
  number, // sizeY
  number, // sizeZ
  string, // textureName for right face
  string, // textureName for left face
  string, // textureName for top face
  string, // textureName for bottom face
  string, // textureName for front face
  string  // textureName for back face
];

export interface ModelPrimitives {
  aabbs: AABBPrimitive[]
}

export interface Block {
  texture: string | null,
  "texture-faces": string[] | null
  model: BlockModelType | null,
  "model-primitives": ModelPrimitives | null
  hitbox: number[] | null,
  rotation: BlockRotation | null,
  "draw-group": number | null, // Группа отрисовки
  "picking-item": string | null, // Выбираемый предметы
  "light-passing": boolean | null, // Светопроводимость
  "sky-light-passing": boolean | null // Солнечная светопроводимость
  obstacle: boolean | null  // Препятствие
  grounded: boolean | null // Приземленность
  selectable: boolean | null // Выделяемость
  replaceable: boolean | null // Заменяемость
  breakable: boolean | null // Разрушаемость
  hidden: boolean | null // Скрытый блок
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
