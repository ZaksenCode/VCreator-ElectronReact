import './BlockParameters.scss'
import CheckBox from '../../../components/value/CheckBox';
import ComboBox from '../../../components/value/ComboBox';
import SettingsBox from '../../../components/value/SettingsBox';
import NumberInt from '../../../components/value/NumberInt';

export default function BlockParameters() {
  return (<div className='block-parameters'>
    <CheckBox valueName="Скрытый:" valueDescription="Тег какой-то" />
    <CheckBox
      valueName="Светопроводимость:"
      valueDescription="Тег какой-то"
    />
    <CheckBox
      valueName="Солнечная светопроводимость:"
      valueDescription="Тег какой-то"
    />
    <CheckBox valueName="Препятствие:" valueDescription="Тег какой-то" />
    <CheckBox
      valueName="Светопроводимость:"
      valueDescription="Тег какой-то"
    />
    <CheckBox valueName="Выделяемость:" valueDescription="Тег какой-то" />
    <CheckBox valueName="Заменяемость:" valueDescription="Тег какой-то" />
    <CheckBox valueName="Разрушаемость:" valueDescription="Тег какой-то" />
    <ComboBox
      valueName="Модель:"
      valueDescription="Тег какой-то"
      boxValues={['block', 'none', 'X', 'aabb']}
    />
    <ComboBox
      valueName="Вращение:"
      valueDescription="Тег какой-то"
      boxValues={['none', 'pipe', 'pane']}
    />
    <SettingsBox valueName="Текстура:" valueDescription="Тег какой-то" />
    <SettingsBox valueName="Скрытый блок:" valueDescription="Тег какой-то" />
    <NumberInt
      valueName="Группа отрисовки:"
      valueDescription="Тег какой-то"
    />
  </div>)
}
