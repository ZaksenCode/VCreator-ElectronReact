import CheckBox from '../value/CheckBox';
import ComboBox from '../value/ComboBox';
import NumberInt from '../value/NumberInt';
import SettingsBox from '../value/SettingsBox';
import './Browser.scss';
import './BlockBrowser.scss';

function Browser(props: any) {
  return (
    <div className="browser block-browser">
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
    </div>
  );
}

export default Browser;
