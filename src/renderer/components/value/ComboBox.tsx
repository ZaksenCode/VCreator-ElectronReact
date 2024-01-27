import './ComboBox.scss';
import HelpButton from '../button/HelpButton';
import DropdownIcon from '../../../../assets/art/icons8-arrow-down-50.png';
import { ReactNode } from 'react';

interface ValueBoxProps {
    valueName: string
    valueDescription: string
    boxValues: Array<string>
    value: string,
    onChange(value: string): void
}

export default function CheckBox(props: ValueBoxProps) {
    return (
        <div className="value-box">
            <div className="value-box-background">
                <div className="value-box-name">
                    {props.valueName}
                </div>
                <div className="value-box-dropdown">
                    <button className="dropdown-button">
                        {props.value}
                        <img className='dropdown-arrow' src={DropdownIcon}></img>
                    </button>
                    <div className="dropdown-content">
                        {
                            props.boxValues.map(
                            (part) => {return <button className='dropdown-button-content' onClick={() => props.onChange(part)}>
                                {part}
                            </button>})
                        }
                    </div>
                </div>
            </div>
            <HelpButton onClick={() => { console.log("Help me!")}} />
        </div>
    )
}
