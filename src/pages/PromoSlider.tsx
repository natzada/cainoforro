import { useEffect, useState } from "react";
import "../styles/PromoSlider.css";
import { useNavigate } from 'react-router-dom';

import promo1 from "../assets/arroz.png";
import promo2 from "../assets/pipoca.png";
import promo3 from "../assets/espetinho.png";
import titulo from "../assets/conheca.png";
import promo4 from "../assets/tiro.png";
import promo5 from "../assets/pesca.png";
import promo6 from "../assets/foto.png";

const imagens: string[] = [promo1, promo2, promo3, promo4, promo5, promo6];

const PromoSlider = () => {
  const [indexAtual, setIndexAtual] = useState<number>(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexAtual((prev) => (prev + 1) % imagens.length);
    }, 3000); // muda a cada 3 seg

    return () => clearInterval(intervalo);
  }, []);

  const navigate = useNavigate();

  const handleResgate = () => {
    navigate('/voucher')
  }

  return (

    <div className="container-promo">
      <div className="titulo">
        <img src={titulo} alt="titulo do slider" />
        <button onClick={handleResgate}>Resgatar Voucher</button>
      </div>


      <div className="slider-diva">
        <img
          src={imagens[indexAtual]}
          alt={`Promoção ${indexAtual + 1}`}
          className="slide-imagem"
        />
        <div className="slider-dots">
          {imagens.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === indexAtual ? "ativo" : ""}`}
              onClick={() => setIndexAtual(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSlider;
