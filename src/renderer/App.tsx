import {
  MemoryRouter as Router,
  Routes,
  Route,
  HashRouter,
} from 'react-router-dom';
import './App.scss';
import './fonts.css';
import React, { useState } from 'react';
import Layout from './components/layout/Layout';
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
  const [activeContent, setActiveContent] = useState('content1');

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
