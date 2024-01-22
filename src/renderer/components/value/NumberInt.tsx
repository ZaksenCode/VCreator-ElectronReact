import './NumberInt.scss';
import HelpButton from '../button/HelpButton';

interface ValueBoxProps {
    valueName: string
    valueDescription: string
}

function NumberInt(props: ValueBoxProps) {
    return (
        <div className="value-box">
            <div className="value-box-background">
                <div className="value-box-name">
                    {props.valueName}
                </div>
                <div className="number-container">
                    <button className='number-button number-minus'>
                        -
                    </button>
                    <input type='text' className='number-field' placeholder='0'></input>
                    <button className='number-button number-plus'>
                        +
                    </button>
                </div>
            </div>
            <HelpButton onClick={() => { console.log("Help me!")}} />
        </div>
    )
}

export default NumberInt;