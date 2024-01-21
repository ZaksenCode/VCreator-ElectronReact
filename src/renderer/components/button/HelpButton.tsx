import './HelpButton.scss';
import helpIcon from '../../../../assets/art/icons8-question-60.png';

interface HelpButtonProps {
    onClick: Function
}

function HelpButton(porps: HelpButtonProps) {
    return (
        <button className="box-help" onClick={() => porps.onClick()}>
            <img className="help-icon" src={helpIcon}>

            </img>
        </button>
    )
}

export default HelpButton;