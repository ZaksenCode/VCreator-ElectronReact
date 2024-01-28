import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './fonts.scss';

import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import ModSelectPage from './pages/mod_select_page/ModSelectPage';
import { ModContext, ModProvider } from './contexts/ModContext';
import BlockEditor from './pages/block_editor_page/BlockEditor';
import ItemEditor from './pages/item_editor_page/ItemEditor';
import { ReactNotifications } from 'react-notifications-component'
import TexturePage from './pages/textures_pages/TexturePage';

export default function App() {
  const modContext = useContext(ModContext);

  // useEffect(() => {
  //   window.electron.ipcRenderer.on('mod-structure-loaded', (modStructure) => {
  //     modContext.setModStructure(modStructure);
  //   });
  //
  //   // Очистка слушателя событий
  //   return () => {
  //     window.electron.ipcRenderer.removeAllListeners('mod-structure-loaded');
  //   };
  // }, []);
  return (
    <ModProvider>
      <div className='app-container'>
        <Sidebar />
        <div className='main-content'>
          <Header />
          <div className='page-container'>
            <Routes>
              <Route path='/' element={<ModSelectPage />} />
              <Route path='/block-edit' element={<BlockEditor />} />
              {/*<Route path='/test3' element={<BlockEditor />} />*/}
              {/*<Route path='/item-edit' element={<ItemEditor />} />*/}
              <Route path='/textures' element={<TexturePage />} />
            </Routes>
          </div>
        </div>
        <ReactNotifications/>
      </div>
    </ModProvider>
  );
}
