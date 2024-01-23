import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './fonts.scss';

import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import BlockBrowser from './components/browser/BlockBrowser';
import { ModProvider } from './contexts/ModContext';
import ModSelect from './pages/modSelect/ModSelect';

function BlockEditor() {
  return (
    <div>
      <BlockBrowser />
    </div>
  );
}

function ScriptsEditor() {
  return <div>Content 3</div>;
}

export default function App() {
  // const [activeContent, setActiveContent] = useState('content1');

  return (
    <ModProvider>
      <div className="layout">
        <Sidebar />
        <div style={{ flex: 1, alignItems: 'flex-start' }}>
          <Header />
          <Routes>
            <Route path="/" element={<ModSelect />} />
            <Route path="/test2" element={<BlockEditor />} />
            <Route path="/test3" element={<ScriptsEditor />} />
          </Routes>
        </div>
      </div>
    </ModProvider>
  );
}
