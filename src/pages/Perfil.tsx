// src/pages/Perfil.tsx
import React, { useState, useEffect } from 'react';
import '../styles/Perfil.css';

const Perfil: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);

  // Simula carregamento de dados do usuário
  useEffect(() => {
    const nomeSalvo = localStorage.getItem('usuarioNome') || 'Usuário Exemplo';
    const emailSalvo = localStorage.getItem('usuarioEmail') || 'usuario@exemplo.com';
    const fotoSalva = localStorage.getItem('usuarioFoto');

    setNome(nomeSalvo);
    setEmail(emailSalvo);
    setFoto(fotoSalva);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('usuarioNome', nome);
    localStorage.setItem('usuarioEmail', email);
    if (foto) localStorage.setItem('usuarioFoto', foto);
    alert('Perfil atualizado com sucesso! ✨');
    setEditando(false);
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="perfil-container">
      <h2>Meu Perfil</h2>

      <div className="foto-perfil">
        <img
          src={foto || '/default-avatar.png'} // substitua por um caminho real ou um ícone padrão
          alt="Foto de perfil"
          className="imagem-perfil"
        />
        {editando && (
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        )}
      </div>

      {editando ? (
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Salvar</button>
        </form>
      ) : (
        <div className="info-perfil">
          <p>{nome}</p>
          <p>{email}</p>
          <button onClick={() => setEditando(true)}>Editar Perfil</button>
        </div>
      )}
    </div>
  );
};

export default Perfil;
