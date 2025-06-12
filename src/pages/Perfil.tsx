// src/pages/Perfil.tsx
import React, { useState } from 'react';
import '../styles/Perfil.css';

const Perfil: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Perfil atualizado com sucesso! ✨');
  };

  return (
    <div className="perfil-container">
      <h2>Meu Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />

        <label>Data do dia:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default Perfil;
