// import './styles/global.css'
// import Home from './pages/Home';
// import GamesSection from './pages/GamesSection';
// import PromoSlider from './pages/PromoSlider';
// import Footer from './pages/Footer';
// import Register from './pages/Register';


// const App = () => (
//   <>
//   <Home />
//   <GamesSection/>
//   <PromoSlider/>
//   <Register/>
//   <Footer/>
//   </>
// );

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';

import Home from './pages/Home';
import GamesSection from './pages/GamesSection';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Footer from './pages/Footer';
import PromoSlider from './pages/PromoSlider';
import JogoDaVelha from './pages/JogoDaVelha';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/jogos" element={<GamesSection />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/JogoDaVelha" element={<JogoDaVelha />}/>
    </Routes>
    <PromoSlider/>
    <Footer />
  </BrowserRouter>
);

export default App;




