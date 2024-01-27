import './NumberInt.scss';
import HelpButton from '../button/HelpButton';

interface ValueBoxProps {
    valueName: string
    valueDescription: string
    value: number,
    onChange(value: number): void
}

function NumberInt(props: ValueBoxProps) {
    return (
        <div className="value-box">
            <div className="value-box-background">
                <div className="value-box-name">
                    {props.valueName}
                </div>
                <div className="number-container">
                    <button className='number-button number-minus' onClick={() => props.onChange(props.value - 1)}>
                        -
                    </button>
                    <input
                      type='text'
                      className='number-field'
                      defaultValue={props.value}
                      value={props.value}
                      placeholder='0'
                      readOnly={true}
                    />
                    <button className='number-button number-plus' onClick={() => props.onChange(props.value + 1)}>
                        +
                    </button>
                </div>
            </div>
            <HelpButton onClick={() => { console.log("Help me!")}} />
        </div>
    )
}

export default NumberInt;
