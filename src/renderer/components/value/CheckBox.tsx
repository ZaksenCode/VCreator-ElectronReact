import './CheckBox.scss';
import HelpButton from '../button/HelpButton';

interface ValueBoxProps {
    valueName: string
    valueDescription: string
}

function CheckBox(props: ValueBoxProps) {
    // Todo -> difrent value elements from selected type (ValueBoxType)
    return (
        <div className="value-box">
            <div className="value-box-background">
                <div className="value-box-name">
                    {props.valueName}
                </div>
                <input className='value-box-checkbox' type="checkbox">

                </input>
            </div>
            <HelpButton onClick={() => { console.log("Help me!")}} />
        </div>
    )
}

export default CheckBox;