import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/global.css';

import Home from './pages/Home';
import GamesSection from './pages/GamesSection';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Footer from './pages/Footer';
import PromoSlider from './pages/PromoSlider';
import JogoDaVelha from './pages/JogoDaVelha';
import Voucher from './pages/Vouchers';
import Return from './components/Return';

const AppContent = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <Return />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/jogos" element={<GamesSection />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/JogoDaVelha" element={<JogoDaVelha />} />
        <Route path="/voucher" element={<Voucher />} />
      </Routes>
      <PromoSlider />
      <Footer />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
