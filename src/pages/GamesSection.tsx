import "../styles/GameSection.css";
import fogueira from "../assets/fogueira.png";
import espantalho from "../assets/espantalho.png";
import milho from "../assets/milho.png";
import fragil from "../assets/fragil.png";
import sanfona from "../assets/acordeao.png";
import fazendeiro from "../assets/agricultores.png";

const GamesSection = () => {
  return (
    <main>
      <div className="grid-inicial">
        <div className="fogueira">
          <p>Milho na Mente</p>
          <img src={fogueira} alt="milho na mente" />
        </div>
        <div className="espantalho">
          <p>Jogo da Véia</p>
          <img src={espantalho} alt="jogo da véia" />
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
