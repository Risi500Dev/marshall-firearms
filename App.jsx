// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Armurerie from './pages/Armurerie';
import Securite from './pages/Securite';
import Boutiques from './pages/Boutiques';
import Compte from './pages/Compte';
import PanelEmploye from './pages/PanelEmploye';
import PanelAdmin from './pages/PanelAdmin';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/armurerie" element={<Armurerie />} />
            <Route path="/securite" element={<Securite />} />
            <Route path="/boutiques" element={<Boutiques />} />
            <Route path="/compte" element={<Compte />} />
            <Route path="/employee" element={<PanelEmploye />} />
            <Route path="/admin" element={<PanelAdmin />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
