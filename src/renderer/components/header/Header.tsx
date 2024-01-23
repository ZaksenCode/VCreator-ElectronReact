import React, { useContext } from 'react';
import './Header.scss';
import { ModContext } from '../../contexts/ModContext';

function Header() {
  const modContext = useContext(ModContext);
  const modName = modContext?.modName || 'Placeholder';
  return (
    <header>
      <div className="title">{modName}</div>
    </header>
  );
}

export default Header;
