import './SettingsBox.scss';
import HelpButton from '../button/HelpButton';

interface ValueBoxProps {
    valueName: string
    valueDescription: string
}

function CheckBox(props: ValueBoxProps) {
    return (
        <div className="value-box">
            <div className="value-box-background">
                <div className="value-box-name">
                    {props.valueName}
                </div>
                <button className='value-box-settings'>
                    Настройки
                </button>
            </div>
            <HelpButton onClick={() => { console.log("Help me!")}} />
        </div>
    )
}

export default CheckBox;