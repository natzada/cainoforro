import { useState } from 'react';
import '../styles/Cadastro.css';
import api from '../services/api';
import Login from './Login'; // Importando componente Login

const Cadastro = () => {
  const [activeForm, setActiveForm] = useState('cadastro');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !senha || !cpf) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await api.post('/usuario/', { nome, email, password: senha, cpf });
      alert('Usuário cadastrado com sucesso! 🎉');
      setNome('');
      setEmail('');
      setSenha('');
      setCpf('');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar 😢');
    }
  };

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
            <form className="form-box" onSubmit={handleCadastro}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />

              <button type="submit" className="submit-btn">Cadastrar</button>

              <p className="login-text">
                Já tem uma conta? <a onClick={() => setActiveForm('login')}>Entrar</a>
              </p>
            </form>

            {/* Login aqui dentro para manter o slider funcionando */}
            <div className="form-box">
              <Login />
            </div>
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
