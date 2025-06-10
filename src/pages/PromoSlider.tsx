import { useEffect, useState } from "react";
import "../styles/PromoSlider.css";

// Imagens promocionais (você pode trocar pelas suas 👇)
import promo1 from "../assets/arroz.png";
import promo2 from "../assets/pipoca.png";
import promo3 from "../assets/arroz.png";

const imagens: string[] = [promo1, promo2, promo3];

const PromoSlider = () => {
  const [indexAtual, setIndexAtual] = useState<number>(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexAtual((prev) => (prev + 1) % imagens.length);
    }, 3000); // muda a cada 3 seg

    return () => clearInterval(intervalo);
  }, []);

  return (
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
  );
};

export default PromoSlider;
