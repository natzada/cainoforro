import { useState } from 'react';
import '../styles/Cadastro.css';

const Cadastro = () => {
  const [activeForm, setActiveForm] = useState('cadastro');

  return (
    <div className="cadastro-container">
      <div className="form-section">
        <div className="form-toggle">
          <button
            className={activeForm === 'cadastro' ? 'active' : ''}
            onClick={() => setActiveForm('cadastro')}
          >
            Cadastro
          </button>
          <button
            className={activeForm === 'login' ? 'active' : ''}
            onClick={() => setActiveForm('login')}
          >
            Login
          </button>
        </div>

        <div className="form-slider-wrapper">
          <div className={`form-slider ${activeForm}`}>
            {/* Cadastro */}
            <form className="form-box">
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="senha">Senha:</label>
              <input type="password" id="senha" name="senha" required />

              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" required />

              <button type="submit" className="submit-btn">Cadastrar</button>

              <p className="login-text">
               <a onClick={() => setActiveForm('login')}>Já tem uma conta?</a>
              </p>
            </form>

            {/* Login */}
            <form className="form-box">
              <label htmlFor="email-login">Email:</label>
              <input type="email" id="email-login" name="email-login" required />

              <label htmlFor="senha-login">Senha:</label>
              <input type="password" id="senha-login" name="senha-login" required />

              <button type="submit" className="submit-btn">Entrar</button>

              <p className="login-text">
                Não tem conta? <a onClick={() => setActiveForm('cadastro')}>Cadastre-se</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="info-section">
        <p className="mensagem">CORAÇÃO BÃO<br />E FORRÓ ARRETADO<br />SÓ COM VOCÊ AQUI UAI!</p>
      </div>
    </div>
  );
};

export default Cadastro;
