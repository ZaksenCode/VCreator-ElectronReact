import './CheckBox.scss';
import HelpButton from '../button/HelpButton';
import CheckMark from '../../../../assets/art/Check.svg';

interface ValueBoxProps {
  valueName: string
  valueDescription: string,
  value: boolean,
  onChange(value: boolean): void
}

function CheckBox(props: ValueBoxProps) {
  return (
    <div className='value-box'>
      <div className='value-box-background'>
        <div className='value-box-name'>
          {props.valueName}
        </div>
        <div className='checkbox-container'>
          <input
            className='value-box-checkbox'
            type='checkbox'
            checked={props.value}
            onChange={e => {
              props.onChange(e.target.checked);
            }}></input>
          <img className='checkmark' src={CheckMark}></img>
        </div>
      </div>
      <HelpButton onClick={() => {
        console.log('Help me!');
      }} />
    </div>
  );
}

export default CheckBox;
