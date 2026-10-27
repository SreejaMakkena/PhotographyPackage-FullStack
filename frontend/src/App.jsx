
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import AddPackage from './AddPackage.jsx';
import ManagePackages from './ManagePackages.jsx';
import Dashboard from './Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPackage />} />
        <Route path="/packages" element={<ManagePackages />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
