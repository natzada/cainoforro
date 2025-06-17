<<<<<<< HEAD
import { useState } from 'react';
import '../styles/Cadastro.css';
import api from '../services/api';
import Login from './Login'; // Importando componente Login
=======
// import { useState } from 'react';
// import '../styles/Cadastro.css';

// const Cadastro = () => {
//   const [activeForm, setActiveForm] = useState('cadastro');

//   return (
//     <div className="cadastro-container">
//       <div className="form-section">
//         <div className="form-toggle">
//           <button
//             className={activeForm === 'cadastro' ? 'active' : ''}
//             onClick={() => setActiveForm('cadastro')}
//           >
//             Cadastro
//           </button>
//           <button
//             className={activeForm === 'login' ? 'active' : ''}
//             onClick={() => setActiveForm('login')}
//           >
//             Login
//           </button>
//         </div>

//         <div className="form-slider-wrapper">
//           <div className={`form-slider ${activeForm}`}>
//             {/* Cadastro */}
//             <form className="form-box">
//               <label htmlFor="nome">Nome:</label>
//               <input type="text" id="nome" name="nome" required />

//               <label htmlFor="email">Email:</label>
//               <input type="email" id="email" name="email" required />

//               <label htmlFor="senha">Senha:</label>
//               <input type="password" id="senha" name="senha" required />

//               <label htmlFor="cpf">CPF:</label>
//               <input type="text" id="cpf" name="cpf" required />

//               <button type="submit" className="submit-btn">Cadastrar</button>

//               <p className="login-text">
//                <a onClick={() => setActiveForm('login')}>Já tem uma conta?</a>
//               </p>
//             </form>

//             {/* Login */}
//             <form className="form-box">
//               <label htmlFor="email-login">Email:</label>
//               <input type="email" id="email-login" name="email-login" required />

//               <label htmlFor="senha-login">Senha:</label>
//               <input type="password" id="senha-login" name="senha-login" required />

//               <button type="submit" className="submit-btn">Entrar</button>

//               <p className="login-text">
//                 Não tem conta? <a onClick={() => setActiveForm('cadastro')}>Cadastre-se</a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

//       <div className="info-section">
//         <p className="mensagem">CORAÇÃO BÃO<br />E FORRÓ ARRETADO<br />SÓ COM VOCÊ AQUI UAI!</p>
//       </div>
//     </div>
//   );
// };

// export default Cadastro;



// import { useState } from 'react';
// import '../styles/Cadastro.css';
// import api from '../services/api';

// const Cadastro = () => {
//   const [activeForm, setActiveForm] = useState('cadastro');
//   const [formData, setFormData] = useState({
//     nome: '',
//     email: '',
//     senha: '',
//     cpf: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCadastro = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/usuario/', formData);
//       alert('Cadastro realizado com sucesso! 🎉');
//       console.log(response.data);
//       setFormData({ nome: '', email: '', senha: '', cpf: '' });
//       setActiveForm('login');
//     } catch (error) {
//       alert('Erro ao cadastrar. 😢');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="cadastro-container">
//       <div className="form-section">
//         <div className="form-toggle">
//           <button
//             className={activeForm === 'cadastro' ? 'active' : ''}
//             onClick={() => setActiveForm('cadastro')}
//           >
//             Cadastro
//           </button>
//           <button
//             className={activeForm === 'login' ? 'active' : ''}
//             onClick={() => setActiveForm('login')}
//           >
//             Login
//           </button>
//         </div>

//         <div className="form-slider-wrapper">
//           <div className={`form-slider ${activeForm}`}>
//             {/* Cadastro */}
//             <form className="form-box" onSubmit={handleCadastro}>
//               <label htmlFor="nome">Nome:</label>
//               <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

//               <label htmlFor="email">Email:</label>
//               <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//               <label htmlFor="senha">Senha:</label>
//               <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />

//               <label htmlFor="cpf">CPF:</label>
//               <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />

//               <button type="submit" className="submit-btn">Cadastrar</button>

//               <p className="login-text">
//                 <a onClick={() => setActiveForm('login')}>Já tem uma conta?</a>
//               </p>
//             </form>

//             {/* Login (ainda sem integração completa) */}
//             <form className="form-box">
//               <label htmlFor="email-login">Email:</label>
//               <input type="email" id="email-login" name="email-login" required />

//               <label htmlFor="senha-login">Senha:</label>
//               <input type="password" id="senha-login" name="senha-login" required />

//               <button type="submit" className="submit-btn">Entrar</button>

//               <p className="login-text">
//                 Não tem conta? <a onClick={() => setActiveForm('cadastro')}>Cadastre-se</a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

//       <div className="info-section">
//         <p className="mensagem">CORAÇÃO BÃO<br />E FORRÓ ARRETADO<br />SÓ COM VOCÊ AQUI UAI!</p>
//       </div>
//     </div>
//   );
// };

// export default Cadastro;


import { useState } from 'react';
import '../styles/Cadastro.css';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba

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
<<<<<<< HEAD
      await api.post('/usuario/', { nome, email, password: senha, cpf });
      alert('Usuário cadastrado com sucesso! 🎉');
=======
      await api.post('/usuario/', { nome, email, senha, cpf });
      alert('Usuário cadastrado com sucesso! 🎉');

      // Limpa os campos
>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba
      setNome('');
      setEmail('');
      setSenha('');
      setCpf('');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar 😢');
    }
  };
<<<<<<< HEAD
=======
  const navigate = useNavigate();

>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba

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

<<<<<<< HEAD
            {/* Login aqui dentro para manter o slider funcionando */}
            <div className="form-box">
              <Login />
            </div>
=======
            {/* Login */}
            <form
  className="form-box"
  onSubmit={(e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica de autenticação se quiser
    navigate('/jogos');
  }}
>
  <label htmlFor="email-login">Email:</label>
  <input type="email" id="email-login" name="email-login" required />

  <label htmlFor="senha-login">Senha:</label>
  <input type="password" id="senha-login" name="senha-login" required />

  <button type="submit" className="submit-btn">Entrar</button>

  <p className="login-text">
    Não tem conta? <a onClick={() => setActiveForm('cadastro')}>Cadastre-se</a>
  </p>
</form>

            {/* <form className="form-box">
              <label htmlFor="email-login">Email:</label>
              <input type="email" id="email-login" name="email-login" required />

              <label htmlFor="senha-login">Senha:</label>
              <input type="password" id="senha-login" name="senha-login" required />

              <button type="submit" className="submit-btn">Entrar</button>

              <p className="login-text">
                Não tem conta? <a onClick={() => setActiveForm('cadastro')}>Cadastre-se</a>
              </p>
            </form> */}
>>>>>>> 17eb03191729b1842b1c185e6f1bb1eb05c293ba
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
