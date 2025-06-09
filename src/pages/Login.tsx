import React, { useState } from 'react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    setError('');
    setSuccess(true);

    // Aqui será feito o fetch para o backend (Spring Boot)
    console.log('Login:', { email, password });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Login feito com sucesso!</p>}
    </div>
  );
};
