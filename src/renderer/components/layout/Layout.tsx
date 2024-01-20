import './Layout.scss';
import React, { useState } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

function TestContent1() {
  return <div>Content 1</div>;
}

function TestContent2() {
  return <div>Content 2</div>;
}

function TestContent3() {
  return <div>Content 3</div>;
}

function Layout() {
  const [activeContent, setActiveContent] = useState('content1');

  return (
    <div className="layout">
      <Router>
        <Sidebar />
        <div style={{ flex: 1, alignItems: 'flex-start' }}>
          <Header />
          <Routes>
            <Route path="/" element={<TestContent1 />} />
            <Route path="/test2" element={<TestContent2 />} />
            <Route path="/test3" element={<TestContent3 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

// <Switch>
//   <Route path="/screen1" render={(props) => <Screen1Component {...props} setTitle={setTitle} />} />
//   <Route path="/screen2" render={(props) => <Screen2Component {...props} setTitle={setTitle} />} />
//   <Route path="/screen3" render={(props) => <Screen3Component {...props} setTitle={setTitle} />} />
//   {/* Другие маршруты */}
// </Switch>

export default Layout;
