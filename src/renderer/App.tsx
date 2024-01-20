import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import './fonts.css';
import Layout from './components/layout/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
}
