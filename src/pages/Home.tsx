import { useState } from 'react';
import '../styles/home.css';
import logo from '../assets/icon.png';
import { FaUser } from 'react-icons/fa';

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header>
                <nav>
                    <div className="hamburger" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <ul className={menuOpen ? 'open' : ''}>
                        <li>Início</li>
                        <li>Stop Junino</li>
                        <li>Jogo da véia</li>
                        <li>Pula Fogueira</li>
                        <li>
                            <button className="btn__login">
                               <FaUser className="icon__login" size={20} />
                            </button>
                        </li>


                    </ul>
                </nav>
            </header>

            <main className='background'>
                <img src={logo} alt="Logo da marca" className="title" />
                <h3 className="subtitle">O tempo passa voando quando <br /> você cainoforró!</h3>
            </main>

            <div className="wave-bottom">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f8eecb" fill-opacity="1" d="M0,256L240,96L480,256L720,96L960,256L1200,32L1440,128L1440,320L1200,320L960,320L720,320L480,320L240,320L0,320Z"></path></svg>
            </div>


            <img src="cacto left" alt="" />
            <div className="text">
                <p className="text-main">
                    enquanto tu espera na fila pode aproveitar e cair no forró!! <br /><br /> tu vai se embalando nos joguinhos do site, e pode ganhar uns vouchers arretados pra trocar por prêmios de verdade lá na festa junina! <br /><br />
                    Jogou bem? Danou-se de ponto? Então pode ser que tu leve um voucher valendo milho, quentão, brinde surpresa, ou até um vale pescaria direto da barraca, visse? <br /><br />
                    É só mostrar o código pro pessoal da barraca e pronto: prêmio garantido e alegria na certa! <br /><br />
                    Num perde tempo, não! Vai jogando, vai ganhando e cai no forró que a noite é uma criança!
                </p>            
            </div>
            <img src="cacto right" alt="" />
        </>
    );
};

export default Home;
