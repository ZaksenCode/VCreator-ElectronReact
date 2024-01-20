import './SidebarButton.scss';

interface ButtonProps {
    buttonImg: string;
    onClick: Function;
}

function SidebarButton(props: ButtonProps) {
    return (
        <button className="sidebar-button" onClick={ () => props.onClick()}>
            <img src={props.buttonImg} className='button-img'/>
        </button>
    )
}

export default SidebarButton;