import './ComboBox.scss';
import HelpButton from '../button/HelpButton';
import DropdownIcon from '../../../../assets/art/icons8-arrow-down-50.png';
import { ReactNode } from 'react';

interface ValueBoxProps {
    valueName: string
    valueDescription: string
    boxValues: Array<string>
}

function CheckBox(props: ValueBoxProps) {
    return (
        <div className="value-box">
            <div className="value-box-background">
                <div className="value-box-name">
                    {props.valueName}
                </div>
                <div className="value-box-dropdown">
                    <button className="dropdown-button">
                        {props.boxValues[0]}
                        <img className='dropdown-arrow' src={DropdownIcon}></img>
                    </button>
                    <div className="dropdown-content">
                        {
                            props.boxValues.map(
                            (part) => {return <button className='dropdown-button-content' onClick={() => console.log("Select: " + part)}>
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

function ConvertToObj(array: Array<string>) {
    var result: string = "";
    for (let index = 0; index < array.length; index++) {
        result += <button> + array[index] + </button>;
    }
    console.log(result);
    return result;
}

export default CheckBox;