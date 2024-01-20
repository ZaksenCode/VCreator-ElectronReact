import SidebarButton from '../button/SidebarButton';
import './Sidebar.scss';
import icon from '../../../../assets/icon.png'
import folder from '../../../../assets/art/icons8-folder-64.png'
import block from '../../../../assets/art/icons8-block-64.png'
import script from '../../../../assets/art/icons8-script-64.png'
import item from '../../../../assets/art/icons8-minecraft-sword-50.png'

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <img src={icon}></img>
                <SidebarButton buttonImg={folder} onClick={() => {
                    console.log("Open project menu")
                }} />
                <SidebarButton buttonImg={block} onClick={() => {
                    console.log("Open block menu")
                }} />
                <SidebarButton buttonImg={script} onClick={() => {
                    console.log("Open scripts menu")
                }} />
                <SidebarButton buttonImg={item} onClick={() => {
                    console.log("Open item menu")
                }} />
            </div>
        </div>
    )
}

export default Sidebar;