import { useContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import SidebarButton from '../button/SidebarButton';
import './Sidebar.scss';
import icon from '../../../../assets/icon.png';
import folder from '../../../../assets/art/icons8-folder-64.png';
import block from '../../../../assets/art/icons8-block-64.png';
import script from '../../../../assets/art/icons8-script-64.png';
import item from '../../../../assets/art/icons8-minecraft-sword-50.png';
import { ModContext } from '../../contexts/ModContext';

function Sidebar() {
  const navigate = useNavigate();
  const modContext = useContext(ModContext);

  // Проверка, открыт ли мод
  const isModOpened = modContext?.modPath && modContext.modPath !== '';

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <img src={icon} />
        <SidebarButton
          buttonImg={folder}
          onClick={() => {
            navigate('/');
          }}
        />
        {isModOpened && (
          <>
            <SidebarButton
              buttonImg={block}
              onClick={() => {
                navigate('/block-edit');
              }}
            />
            <SidebarButton
              buttonImg={script}
              onClick={() => {
                navigate('/test3');
              }}
            />
            <SidebarButton
              buttonImg={item}
              onClick={() => {
                redirect('/item-edit');
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
