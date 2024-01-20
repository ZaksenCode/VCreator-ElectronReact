import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './fonts.scss';

import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';

function TestContent1() {
  return <div>Content 1</div>;
}

function TestContent2() {
  return <div>Content 2</div>;
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
        <Header title="34" />
        <Routes>
          <Route path="/" element={<TestContent1 />} />
          <Route path="/test2" element={<TestContent2 />} />
          <Route path="/test3" element={<TestContent3 />} />
        </Routes>
      </div>
    </div>
  );
}
