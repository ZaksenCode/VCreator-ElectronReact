import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './fonts.scss';

import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import ModSelectPage from './pages/mod_select_page/ModSelectPage';
import { ModProvider } from './contexts/ModContext';
import BlockEditor from './pages/block_editor_page/BlockEditor';

export default function App() {
  // const [activeContent, setActiveContent] = useState('content1');

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
              <Route path='/test3' element={<BlockEditor />} />
            </Routes>
          </div>
        </div>
      </div>
    </ModProvider>
  );
}
