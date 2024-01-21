import './ComboBox.scss';
import HelpButton from '../button/HelpButton';
import DropdownIcon from '../../../../assets/art/icons8-arrow-down-50.png';

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
                <div className="value-box-dropdown">
                    <button className="dropdown-button">
                        block
                        <img className='dropdown-arrow' src={DropdownIcon}></img>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">block</a>
                        <a href="#">none</a>
                        <a href="#">X</a>
                        <a href="#">aabb</a>
                    </div>
                </div> 
            </div>
            <HelpButton onClick={() => { console.log("Help me!")}} />
        </div>
    )
}

export default CheckBox;