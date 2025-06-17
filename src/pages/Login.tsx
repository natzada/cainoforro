import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        senha,
      });

      if (response.data && response.data.nome) {
        localStorage.setItem('usuario', JSON.stringify(response.data));
        setErro('');
        navigate('/jogos');
      } else {
        setErro('Login inválido. Verifique suas credenciais.');
      }
    } catch (erro) {
  console.error('Erro ao fazer login:', erro); // <-- isso já elimina o aviso
  setErro('Login inválido. Verifique suas credenciais.');
}

  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
};

export default Login;
