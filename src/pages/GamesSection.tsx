import "../styles/GameSection.css";
import fogueira from "../assets/fogueira.png";
import espantalho from "../assets/espantalho.png";
import milho from "../assets/milho.png";
import fragil from "../assets/fragil.png";
import sanfona from "../assets/acordeao.png";
import fazendeiro from "../assets/agricultores.png";
import bandeirinha from "../assets/bandeirinhas.png";
import { Link } from "react-router-dom";

const GamesSection = () => {
  return (
    <main>
      <div className="bandeirinha-container">
           <img src={bandeirinha} className="bandeirinha" alt="Bandeirinhas juninas"/>
            </div>
               <p className="jogos">Aqui você pode escolher o jogo que mais gosta!</p>
      <div className="grid-inicial">
        <div className="fogueira">
          <p>Milho na Mente</p>
          <img src={fogueira} alt="milho na mente" />
        </div>
      <div className="espantalho">
        <Link to="/JogoDaVelha">
          <p>Jogo da Véia</p>
          <img src={espantalho} alt="jogo da véia" />
        </Link>
      </div>

        <div className="milho">
          
          <p>Estoure o Milho</p>
          <img src={milho} alt="estoure o milho" />
        </div>
        </div>
        <div className="grid-secundaria">
        <div className="fragil">
          <p>Batalha no Curral</p>
          <img src={fragil} alt="batalha no curral" />
        </div>
        <div className="sanfona">
          <p>Caça a pamonha</p>
          <img src={sanfona} alt="caça a sanfona" />
        </div>
        <div className="fazendeiro">
          <p>Ordem na Quadrilha</p>
          <img src={fazendeiro} alt="ordem na quadrilha" />
        </div>
      </div>
    </main>
  );
};

export default GamesSection;
