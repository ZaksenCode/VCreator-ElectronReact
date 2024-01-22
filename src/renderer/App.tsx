import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './fonts.scss';

import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import BlockBrowser from './components/browser/BlockBrowser';

function TestContent1() {
  return (
  <div>
  </div>
  )
}

function TestContent2() {
  return (
  <div>
    <BlockBrowser />
  </div>
  )
}

function TestContent3() {
  return <div>Content 3</div>;
}

export default function App() {
  // const [activeContent, setActiveContent] = useState('content1');

  return (
    <div className="layout">
      <Sidebar />
      <div style={{ flex: 1, alignItems: 'flex-start' }}>
        <Header />
        <Routes>
          <Route path="/" element={<TestContent1 />} />
          <Route path="/test2" element={<TestContent2 />} />
          <Route path="/test3" element={<TestContent3 />} />
        </Routes>
      </div>
    </div>
  );
}
