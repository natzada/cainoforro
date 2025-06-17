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

<<<<<<< HEAD
=======
      

>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba

      const user = response.data;

      localStorage.setItem('usuario', JSON.stringify(user));
      alert('Login realizado com sucesso!');
<<<<<<< HEAD
      navigate('/jogos'); // Change to your home page
=======
      navigate('/home'); // Change to your home page
>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba
    } catch (error) {
      console.error(error);
      setErro('E-mail ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
<<<<<<< HEAD
      <label htmlFor="email">Email:</label>
      <input
        type="email"
=======
      <h2>Login</h2>

      <input
        type="email"
        placeholder="E-mail"
>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

<<<<<<< HEAD
      <label htmlFor="senha">Senha:</label>
      <input
        type="password"
=======
      <input
        type="password"
        placeholder="Senha"
>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={handleLogin}>Entrar</button>

      {erro && <p className="error">{erro}</p>}
    </div>
  );
};

export default Login;
