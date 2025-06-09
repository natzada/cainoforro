// server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const rooms = {};

const categorias = [
  'Nome',
  'Música/cantor de Festa Junina',
  'Comida típica',
  'Brincadeira de Festa Junina',
  'Roupa Junina',
  'Zé é'
];

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const gerarLetra = () => letras[Math.floor(Math.random() * letras.length)];

io.on('connection', (socket) => {
  console.log('Novo usuário conectado:', socket.id);

  socket.on('join-room', ({ roomId, playerName }, callback) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        currentAnswers: {},
        started: false,
      };
    }

    if (rooms[roomId].players[playerName]) {
      return callback({ error: 'Nome já está em uso na sala.' });
    }

    socket.join(roomId);
    rooms[roomId].players[playerName] = { name: playerName, score: 0, socketId: socket.id };
    io.to(roomId).emit('update-players', Object.values(rooms[roomId].players));
    callback({ success: true });
  });

  socket.on('leave_room', ({ roomId }, callback) => {
    for (const playerName in rooms[roomId]?.players || {}) {
      if (rooms[roomId].players[playerName].socketId === socket.id) {
        delete rooms[roomId].players[playerName];
        break;
      }
    }
    socket.leave(roomId);
    io.to(roomId).emit('update-players', Object.values(rooms[roomId]?.players || {}));
    callback({ success: true });
  });

  socket.on('start-game', (roomId) => {
    const room = rooms[roomId];
    if (!room) return;

    room.started = true;
    room.currentAnswers = {};
    const letter = gerarLetra();
    const duration = 60; // 60 segundos por rodada
    io.to(roomId).emit('game-started', { letter, categories: categorias, duration });

    setTimeout(() => {
      io.to(roomId).emit('round_ended', calcularPontuacao(roomId));
    }, duration * 1000);
  });

  socket.on('submit-answers', ({ roomId, answers }) => {
    const playerName = Object.keys(rooms[roomId].players).find(
      name => rooms[roomId].players[name].socketId === socket.id
    );
    if (!playerName) return;

    rooms[roomId].currentAnswers[playerName] = answers;

    const totalPlayers = Object.keys(rooms[roomId].players).length;
    const totalSubmitted = Object.keys(rooms[roomId].currentAnswers).length;

    if (totalSubmitted === totalPlayers) {
      io.to(roomId).emit('all-answers-submitted');
      io.to(roomId).emit('round_ended', calcularPontuacao(roomId));
    }
  });

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      const players = rooms[roomId].players;
      for (const name in players) {
        if (players[name].socketId === socket.id) {
          delete players[name];
          break;
        }
      }
      io.to(roomId).emit('update-players', Object.values(players));
    }
  });
});

function calcularPontuacao(roomId) {
  const room = rooms[roomId];
  const respostas = room.currentAnswers;
  const letra = room.letraAtual || 'A';
  const scores = {};

  for (const player in respostas) {
    scores[player] = 0;
  }

  categorias.forEach(categoria => {
    const respostasCategoria = {};

    for (const player in respostas) {
      const resposta = respostas[player][categoria]?.trim().toUpperCase() || '';
      if (!resposta.startsWith(letra)) continue;
      if (!respostasCategoria[resposta]) {
        respostasCategoria[resposta] = [player];
      } else {
        respostasCategoria[resposta].push(player);
      }
    }

    for (const resposta in respostasCategoria) {
      const jogadores = respostasCategoria[resposta];
      const pontos = jogadores.length === 1 ? 10 : 5;
      jogadores.forEach(jogador => {
        scores[jogador] += pontos;
        room.players[jogador].score += pontos;
      });
    }
  });

  return {
    answers: respostas,
    scores,
    players: Object.values(room.players)
  };
}

server.listen(4000, () => console.log('Servidor rodando na porta 4000'));