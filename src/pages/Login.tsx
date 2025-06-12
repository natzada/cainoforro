// import React, { useState } from 'react';

// export const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleLogin = (e: React.FormEvent) => {
//     // e.preventDefault();

//     // if (!email || !password) {
//     //   setError('Preencha todos os campos.');
//     //   return;
//     // }

//     // setError('');
//     // setSuccess(true);

//     // // Aqui será feito o fetch para o backend (Spring Boot)
//     // console.log('Login:', { email, password });
//     const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!email || !password) {
//     setError('Preencha todos os campos.');
//     return;
//   }

//   try {
//     const response = await fetch('http://localhost:8080/usuario/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, senha: password }),
//     });

//     if (!response.ok) {
//       throw new Error('Email ou senha inválidos');
//     }

//     const data = await response.json();
//     setSuccess(true);
//     setError('');
//     console.log('Usuário logado:', data);
//     // aqui você pode redirecionar ou guardar o token/usuário
//   } catch (err: any) {
//     setError(err.message);
//     setSuccess(false);
//   }
// };

//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>Senha:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button type="submit">Entrar</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>Login feito com sucesso!</p>}
//     </div>
//   );
// };

// import React, { useState } from 'react';

// export const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Preencha todos os campos.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/usuario/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, senha: password }),
//       });

//       if (!response.ok) {
//         throw new Error('Email ou senha inválidos');
//       }

//       const data = await response.json();
//       setSuccess(true);
//       setError('');
//       console.log('Usuário logado:', data);
//     } catch (err: any) {
//       setError(err.message);
//       setSuccess(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>Senha:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button type="submit">Entrar</button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>Login feito com sucesso!</p>}
//     </div>
//   );
// };

import React, { useState } from 'react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setError('Preencha todos os campos.');
      setSuccess(false);
      return;
    }

    try {
      const url = `http://localhost:8080/usuario/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Email ou senha inválidos');
      }

      const data = await response.json();
      setSuccess(true);
      setError('');
      console.log('Usuário logado:', data);

      // Aqui você pode redirecionar ou salvar o usuário/token no localStorage
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Senha:</label><br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 16px' }}>Entrar</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: 10 }}>Login feito com sucesso!</p>}
    </div>
  );
};

