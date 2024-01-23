import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './fonts.scss';

import React, { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import BlockBrowser from './components/browser/BlockBrowser';
import FolderBrowser from './components/browser/FolderBrowser';
import ProjectDataBrowser from './components/browser/ProjectDataBrowser';
import Button, { ButtonType } from './components/button/Button';
import ModSelect from './pages/mod_select_page/ModSelect';
import { ModProvider } from './contexts/ModContext';

function Content1() {
  return (
    <div className="content-1">
      <ProjectDataBrowser
        version="0"
        author="none"
        description="none"
        tags="none"
      />
      <div className="content-1-other">
        <div className="content-1-buttons">
          <Button
            text="Версия"
            onClick={() => {
              console.log('Verison');
            }}
            type={ButtonType.Primary}
          />
          <Button
            text="Автор"
            onClick={() => {
              console.log('Author');
            }}
            type={ButtonType.Primary}
          />
          <Button
            text="Описание"
            onClick={() => {
              console.log('Description');
            }}
            type={ButtonType.Primary}
          />
          <Button
            text="Теги"
            onClick={() => {
              console.log('Tags');
            }}
            type={ButtonType.Primary}
          />
        </div>
        <div className="content-1-wip">
          Данная вкладка в разработки и не выполняет никакого функционала!
        </div>
      </div>
      <Button
        text="Загрузить контент пак"
        onClick={() => {
          console.log('Load pack');
        }}
        type={ButtonType.Primary}
      />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-2">
      <FolderBrowser />
      <BlockBrowser />
    </div>
  );
}

function Content3() {
  return <div className="content-3" />;
}

function Content4() {
  return <div className="content-4" />;
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
            <Route path="/block-edit" element={<Content2 />} />
            <Route path="/test3" element={<Content3 />} />
          </Routes>
        </div>
      </div>
    </ModProvider>
  );
}
