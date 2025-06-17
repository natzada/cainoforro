import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: senha,
      });

      


      const user = response.data;

      localStorage.setItem('usuario', JSON.stringify(user));
      alert('Login realizado com sucesso!');
      navigate('/home'); // Change to your home page
    } catch (error) {
      console.error(error);
      setErro('E-mail ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={handleLogin}>Entrar</button>

      {erro && <p className="error">{erro}</p>}
    </div>
  );
};

export default Login;
