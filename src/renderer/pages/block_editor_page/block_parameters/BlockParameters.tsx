import './BlockParameters.scss';
import CheckBox from '../../../components/value/CheckBox';
import { Block, FileMetadata } from '../../../../types';
import { parseJson } from '../../../utils';
import { useContext, useEffect, useState } from 'react';
import { ModContext } from '../../../contexts/ModContext';

interface BlockParametersProps {
  blockFile: FileMetadata;

  onEdit(block: Block): void;
}

export default function BlockParameters(
  { blockFile, onEdit }: BlockParametersProps
) {
  const modContext = useContext(ModContext)
  const [getBlock, setBlock] = useState<Block | null>(null);

  // По факту выбора блока - читаем контент файла и парсим в блок
  useEffect(() => {
    modContext?.loadFileContent(blockFile.path).then(content => {
      content && setBlock(parseJson<Block>(content))
    })
  }, [blockFile]);

  // При изменении параметра блока, колбекаем измененный блок
  const updateBlock = (block: Block) => {
    onEdit(block);
  };

  return (<div className='block-parameters'>
    {getBlock != null ? <Parameters block={getBlock} onChange={(newBlock) => updateBlock(newBlock)} /> : null}
  </div>);
}

interface ParametersProps {
  block: Block;

  onChange(blockNewState: Block): void;
}

function Parameters({ block, onChange }: ParametersProps) {
  const handleCheckboxChange = (value: boolean) => {
    const updatedBlock = { ...block, ['light-passing']: value };
    onChange(updatedBlock);
  };
  return (
    <>
      <CheckBox
        valueName='Светопроводимость:'
        valueDescription='Тег какой-то'
        value={block['light-passing']}
        onChange={handleCheckboxChange}
      />
    </>
  );
}


{/*<CheckBox */
}
{/*  valueName='Скрытый:' */
}
{/*  valueDescription='Тег какой-то'*/
}

{/*/>*/
}
{/*<CheckBox*/
}
{/*  valueName='Светопроводимость:'*/
}
{/*  valueDescription='Тег какой-то'*/
}
{/*/>*/
}
{/*<CheckBox*/
}
{/*  valueName='Солнечная светопроводимость:'*/
}
{/*  valueDescription='Тег какой-то'*/
}
{/*/>*/
}
{/*<CheckBox valueName='Препятствие:' valueDescription='Тег какой-то' />*/
}
{/*<CheckBox*/
}
{/*  valueName='Светопроводимость:'*/
}
{/*  valueDescription='Тег какой-то'*/
}
{/*  value={parsedBlock?['light-passing']}*/
}
{/*  */
}
{/*/>*/
}
{/*<CheckBox valueName='Выделяемость:' valueDescription='Тег какой-то' />*/
}
{/*<CheckBox valueName='Заменяемость:' valueDescription='Тег какой-то' />*/
}
{/*<CheckBox valueName='Разрушаемость:' valueDescription='Тег какой-то' />*/
}
{/*<ComboBox*/
}
{/*  valueName='Модель:'*/
}
{/*  valueDescription='Тег какой-то'*/
}
{/*  boxValues={['block', 'none', 'X', 'aabb']}*/
}
{/*/>*/
}
{/*<ComboBox*/
}
{/*  valueName='Вращение:'*/
}
{/*  valueDescription='Тег какой-то'*/
}
{/*  boxValues={['none', 'pipe', 'pane']}*/
}
{/*/>*/
}
{/*<SettingsBox valueName='Текстура:' valueDescription='Тег какой-то' />*/
}
{/*<SettingsBox valueName='Скрытый блок:' valueDescription='Тег какой-то' />*/
}
{/*<NumberInt*/
}
{/*  valueName='Группа отрисовки:'*/
}
{/*  valueDescription='Тег какой-то'*/
}
{/*/>*/
}
