import './ItemParameters.scss';
import CheckBox from '../../../components/value/CheckBox';
import { Item, FileMetadata } from '../../../../types';
import { parseJson } from '../../../utils';
import { useEffect, useState } from 'react';

interface ItemParametersProps {
  itemFile: FileMetadata;

  onEdit(block: Item): void;
}

export default function ItemParameters(
  { itemFile, onEdit}: ItemParametersProps
) {
  const [getItem, setItem] = useState<Item | null>(null);

  useEffect(() => {
    // setItem(parseJson<Item>(itemFile.content)); // Обновление состояния при изменении itemFile
  }, [itemFile]);
  const updateItem = (item: Item) => {
    setItem(item);
    onEdit(item)
  };

  return (<div className='item-parameters'>
    {getItem != null ? <Parameters item={getItem} onChange={(newItem) => updateItem(newItem)} /> : null}
  </div>);
}

interface ParametersProps {
  item: Item;

  onChange(blockNewState: Item): void;
}

function Parameters({ item, onChange }: ParametersProps) {
  const handleCheckboxChange = (value: boolean) => {
    const updatedBlock = { ...item, ['light-passing']: value };
    onChange(updatedBlock);
  };
  return (
    <>
      <CheckBox
        valueName='Светопроводимость:'
        valueDescription='Тег какой-то'
        value={
          false // TODO - подставлять значение
        }
        onChange={handleCheckboxChange}
      />
    </>
  );
}


{/*<CheckBox */}
{/*  valueName='Скрытый:' */}
{/*  valueDescription='Тег какой-то'*/}

{/*/>*/}
{/*<CheckBox*/}
{/*  valueName='Светопроводимость:'*/}
{/*  valueDescription='Тег какой-то'*/}
{/*/>*/}
{/*<CheckBox*/}
{/*  valueName='Солнечная светопроводимость:'*/}
{/*  valueDescription='Тег какой-то'*/}
{/*/>*/}
{/*<CheckBox valueName='Препятствие:' valueDescription='Тег какой-то' />*/}
{/*<CheckBox*/}
{/*  valueName='Светопроводимость:'*/}
{/*  valueDescription='Тег какой-то'*/}
{/*  value={parsedBlock?['light-passing']}*/}
{/*  */}
{/*/>*/}
{/*<CheckBox valueName='Выделяемость:' valueDescription='Тег какой-то' />*/}
{/*<CheckBox valueName='Заменяемость:' valueDescription='Тег какой-то' />*/}
{/*<CheckBox valueName='Разрушаемость:' valueDescription='Тег какой-то' />*/}
{/*<ComboBox*/}
{/*  valueName='Модель:'*/}
{/*  valueDescription='Тег какой-то'*/}
{/*  boxValues={['block', 'none', 'X', 'aabb']}*/}
{/*/>*/}
{/*<ComboBox*/}
{/*  valueName='Вращение:'*/}
{/*  valueDescription='Тег какой-то'*/}
{/*  boxValues={['none', 'pipe', 'pane']}*/}
{/*/>*/}
{/*<SettingsBox valueName='Текстура:' valueDescription='Тег какой-то' />*/}
{/*<SettingsBox valueName='Скрытый блок:' valueDescription='Тег какой-то' />*/}
{/*<NumberInt*/}
{/*  valueName='Группа отрисовки:'*/}
{/*  valueDescription='Тег какой-то'*/}
{/*/>*/}
