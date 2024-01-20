import './Layout.scss';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

function MainContent() {
  return <div>MainContent</div>;
}

function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, alignItems: 'flex-start' }}>
        <Header />
        <MainContent />
      </div>
    </div>
  );
}

export default Layout;
