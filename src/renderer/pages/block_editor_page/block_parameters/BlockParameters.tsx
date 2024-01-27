import './BlockParameters.scss';
import CheckBox from '../../../components/value/CheckBox';
import ComboBox from '../../../components/value/ComboBox';
import NumberInt from '../../../components/value/NumberInt';
import { Block, FileMetadata } from '../../../../types';
import { parseJson } from '../../../utils';
import React, { useContext, useEffect, useState } from 'react';
import { ModContext } from '../../../contexts/ModContext';
import BlockPreview from './block_preview/BlockPreview';


interface BlockParametersProps {
  blockFile: FileMetadata;

  onEdit(block: Block): void;
}

export default function BlockParameters(
  { blockFile, onEdit }: BlockParametersProps
) {
  const modContext = useContext(ModContext);
  const [getBlock, setBlock] = useState<Block | null>(null);

  // По факту выбора блока - читаем контент файла и парсим в блок
  useEffect(() => {
    modContext?.contentFile && setBlock(parseJson<Block>( modContext?.contentFile));
  }, [modContext?.contentFile]);

  // При изменении параметра блока, колбекаем измененный блок
  const updateBlock = (block: Block) => {
    onEdit(block);
  };

  return (
    <div className='block-parameters'>
      {getBlock != null ? <Parameters
        block={getBlock}
        modPath={modContext?.modPath || ''}
        onChange={(newBlock) => updateBlock(newBlock)}
      /> : null}
    </div>);
}

interface ParametersProps {
  block: Block;
  modPath: string;

  onChange(blockNewState: Block): void;
}

function Parameters({ block, onChange, modPath }: ParametersProps) {
  return (
    <>
      <BlockPreview
        block={block}
        modPath={modPath}
      />

      <ComboBox
        valueName='Вращение:'
        valueDescription='Тег какой-то'
        boxValues={['none', 'pipe', 'pane']}
        value={block.rotation == null ? 'none' : block.rotation}
        onChange={value => {
          // @ts-ignore
          const updatedBlock: Block = { ...block, ['rotation']: value };
          onChange(updatedBlock);
        }}
      />

      <NumberInt
        valueName='Группа отрисовки:'
        valueDescription='Тег какой-то'
        value={block['draw-group'] == null ? 0 : block['draw-group']}
        onChange={value => {
          if (value < 0 || value > 2) return;
          const updatedBlock = { ...block, ['draw-group']: value };
          onChange(updatedBlock);
        }}
      />

      <CheckBox
        valueName='Светопроводимость:'
        valueDescription='Тег какой-то'
        value={block['light-passing'] == null ? false : block['light-passing']}
        onChange={value => {
          const updatedBlock = { ...block, ['light-passing']: value };
          onChange(updatedBlock);
        }}
      />
      <CheckBox
        valueName='Солнечная светопроводимость:'
        valueDescription='Тег какой-то'
        value={block['sky-light-passing'] == null ? false : block['sky-light-passing']}
        onChange={value => {
          const updatedBlock = { ...block, ['sky-light-passing']: value };
          onChange(updatedBlock);
        }}
      />
      <CheckBox
        valueName='Препятствие:'
        valueDescription='Тег какой-то'
        value={block.obstacle == null ? true : block.obstacle}
        onChange={value => {
          const updatedBlock = { ...block, ['obstacle']: value };
          onChange(updatedBlock);
        }}
      />
      <CheckBox
        valueName='Приземленность:'
        valueDescription='Тег какой-то'
        value={block.grounded == null ? false : block.grounded}
        onChange={value => {
          const updatedBlock = { ...block, ['grounded']: value };
          onChange(updatedBlock);
        }}
      />
      <CheckBox
        valueName='Выделяемость:'
        valueDescription='Тег какой-то'
        value={block.selectable == null ? true : block.selectable}
        onChange={value => {
          const updatedBlock = { ...block, ['selectable']: value };
          onChange(updatedBlock);
        }}
      />
      <CheckBox
        valueName='Заменяемость:'
        valueDescription='Тег какой-то'
        value={block.replaceable == null ? false : block.replaceable}
        onChange={value => {
          const updatedBlock = { ...block, ['replaceable']: value };
          onChange(updatedBlock);
        }}
      />
      <CheckBox
        valueName='Разрушаемость:'
        valueDescription='Тег какой-то'
        value={block.breakable == null ? true : block.breakable}
        onChange={value => {
          console.log(value);
          const updatedBlock = { ...block, ['breakable']: value };
          onChange(updatedBlock);
        }}
      />
      <CheckBox
        valueName='Скрыть из инвентаря:'
        valueDescription='Тег какой-то'
        value={block.hidden || false}
        onChange={value => {
          const updatedBlock = { ...block, ['hidden']: value };
          onChange(updatedBlock);
        }}
      />
    </>
  );
}
