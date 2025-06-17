// src/components/JoinRoom.tsx

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4000');

interface Player {
  name: string;
  score: number;
}

interface Answer {
  [category: string]: string;
}

interface RoundResults {
  answers: Record<string, Answer>;
  scores: Record<string, number>;
  players: Player[];
}

export const JoinRoom: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [customRoom, setCustomRoom] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [joined, setJoined] = useState(false);
  const [letter, setLetter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [allAnswersSubmitted, setAllAnswersSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [roundResults, setRoundResults] = useState<RoundResults | null>(null);
  const [gameState, setGameState] = useState<'menu' | 'lobby' | 'playing' | 'results'>('menu');


  const generateRoomId = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const createRoom = () => {
    const newRoom = generateRoomId();
    setRoomId(newRoom);
    setCustomRoom(true);
  };

  const joinRoom = () => {
    const finalRoomId = roomId.trim() || 'geral';
    if (playerName.trim()) {
      socket.emit('join-room', { roomId: finalRoomId, playerName }, (response: any) => {
        if (response?.error) {
          setErrorMessage(response.error);
        } else {
          setRoomId(finalRoomId);
          setJoined(true);
          setGameState('lobby');
          setErrorMessage('');
        }
      });
    }
  };

  const leaveRoom = () => {
    socket.emit('leave_room', { roomId }, (res: any) => {
      if (res.success) {
        setRoomId('');
        setJoined(false);
        setPlayerName('');
        setPlayers([]);
        setLetter('');
        setAnswers({});
        setTimeLeft(null);
        setRoundResults(null);
        setCategories([]);
        setGameState('menu');
      }
    });
  };

  useEffect(() => {
    socket.on('update-players', (players: Player[]) => setPlayers(players));

    socket.on('game-started', ({ letter, categories, duration }) => {
      setLetter(letter);
      setCategories(categories);
      setAnswers({});
      setAllAnswersSubmitted(false);
      setTimeLeft(duration);
      setGameState('playing');
    });

    socket.on('all-answers-submitted', (data) => {
      setAllAnswersSubmitted(true);
      console.log('Respostas de todos:', data);
    });

    socket.on('round_ended', ({ answers, scores, players }) => {
      setRoundResults({ answers, scores, players });
      setGameState('results');

    });

    return () => {
      socket.off('update-players');
      socket.off('game-started');
      socket.off('all-answers-submitted');
      socket.off('round_ended');
    };
  }, []);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(prev => prev! - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const startGame = () => socket.emit('start-game', roomId);

  const handleAnswerChange = (category: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [category]: value }));
  };

  const submitAnswers = () => {
    socket.emit('submit-answers', { roomId, answers });
  };

  return (
    <div style={{ padding: 20 }}>
      {gameState === 'menu' && (
  <div>
    <h2>Entre na Sala Junina </h2>
    <input
      type="text"
      placeholder="Digite seu nome"
      value={playerName}
      onChange={(e) => setPlayerName(e.target.value)}
    />
    <br />

    {!customRoom && (
      <div>
        <button onClick={createRoom}>Criar sala</button>
        <p>ou insira o código de uma sala:</p>
        <input
          type="text"
          placeholder="Código da sala (ou deixe vazio para sala geral)"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
    )}

    <button onClick={joinRoom}>Entrar</button>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  </div>
)}

{gameState === 'lobby' && (
  <div>
    <h2>Bem-vindo à sala, {playerName}!</h2>
    <p><strong>Código da sala:</strong> {roomId}</p>
    <p><strong>Jogadores na sala:</strong></p>
    <ul>
      {players.map((p, idx) => (
        <li key={idx}>{p.name} - {p.score} pts</li>
      ))}
    </ul>

    <button onClick={leaveRoom} style={{ marginBottom: 10 }}>Sair da Sala</button>
    <button onClick={startGame}>Começar o jogo</button>
  </div>
)}

{gameState === 'playing' && (
  <div>
    <h3>Letra sorteada: {letter}</h3>
    {timeLeft !== null && <p>⏱️ Tempo: {timeLeft}s</p>}
    <h4>Responda as categorias:</h4>
    <form onSubmit={(e) => { e.preventDefault(); submitAnswers(); }}>
      {categories.map((c, idx) => (
        <div key={idx}>
          <label>{c}:</label>
          <input
            type="text"
            value={answers[c] || ''}
            onChange={(e) => handleAnswerChange(c, e.target.value)}
            required
          />
        </div>
      ))}
      <button type="submit">Enviar respostas</button>
    </form>
    {allAnswersSubmitted && <p>Todos responderam! Aguarde a pontuação...</p>}
  </div>
)}

{gameState === 'results' && roundResults && (
  <div>
    <h3>Resultados da Rodada:</h3>
    <ul>
      {roundResults.players.map((player, idx) => (
        <li key={idx}>
          {player.name}: {roundResults.scores[player.name] || 0} pts (Total: {player.score})
        </li>
      ))}
    </ul>
    <button onClick={() => setGameState('lobby')}>Nova Rodada</button>
    <button onClick={leaveRoom}>Sair da Sala</button>
  </div>
)}

    </div>
  );
};
