/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/VoucherList.css';

import arroz from '../assets/vale-arroz-doce.png';
import pipoca from '../assets/vale-pipoca-doce.png';
import espetinho from '../assets/vale-espetinho.png';
import tiro from '../assets/vale-tiro-ao-alvo.png';
import pesca from '../assets/vale-pesca.png';
import foto from '../assets/vale-foto.png';

const vouchersMock = [
  { id: 1, nome: 'Arroz Doce', img: arroz, tipo: 'ARROZ_DOCE' },
  { id: 2, nome: 'Pipoca Doce', img: pipoca, tipo: 'PIPOCA_DOCE' },
  { id: 3, nome: 'Espetinho', img: espetinho, tipo: 'ESPETINHO' },
  { id: 4, nome: 'Tiro ao Alvo', img: tiro, tipo: 'TIRO_AO_ALVO' },
  { id: 5, nome: 'Pesca', img: pesca, tipo: 'PESCA' },
  { id: 6, nome: 'Cabine de Fotos', img: foto, tipo: 'FOTO_NA_CABINE' },
];

const Voucher: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [voucherResgatado, setVoucherResgatado] = useState<any | null>(null);
  const [erro, setErro] = useState('');

  // Verifica se o usuário pode resgatar hoje (front)
  const podeResgatarHoje = (userId: number) => {
    const dataResgateStr = localStorage.getItem(`ultimoResgateVoucher_${userId}`);
    if (!dataResgateStr) return true;

    const dataResgate = new Date(dataResgateStr);
    const hoje = new Date();

    // Compara apenas ano, mês e dia para saber se já resgatou hoje
    return !(
      dataResgate.getFullYear() === hoje.getFullYear() &&
      dataResgate.getMonth() === hoje.getMonth() &&
      dataResgate.getDate() === hoje.getDate()
    );
  };

  const handleCriarVoucher = async (tipo: string, nomeProduto: string) => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = user.id;

    if (!userId) {
      setErro("Usuário não autenticado. Faça login novamente.");
      setModalVisible(true);
      return false;
    }

    const dataAtual = new Date().toISOString();

    const voucherData = {
      id: null,
      produto: nomeProduto,
      createdAt: dataAtual,
      code: 'KF7-FK6-85P', // insira manualmente o código desejado aqui
      usuario: { id: userId },
      type: tipo
    };

    try {
      const response = await axios.post('http://localhost:8080/voucher/', voucherData);
      if (response.data) {
        setVoucherResgatado(response.data);

        // Salva a data do último resgate no localStorage
        localStorage.setItem(`ultimoResgateVoucher_${userId}`, new Date().toISOString());

        return true;
      }
    } catch (error) {
      setErro('Erro ao criar o voucher.');
      setModalVisible(true);
      return false;
    }
  };

  const handleResgatar = async (userId: number) => {
    try {
      const response = await axios.post(`http://localhost:8080/voucher/daily/${userId}`);

      if (response.data.code) {
        setVoucherResgatado(response.data);
        setErro('');
        setModalVisible(true);
      } else if (response.data.message) {
        const segundos = response.data.secondsLeft;
        const minutos = Math.floor(segundos / 60);
        setErro(`Você já resgatou um voucher hoje. Tente novamente em ${minutos} min.`);
        setModalVisible(true);
      }
    } catch (error) {
      setErro('Não foi possível resgatar o seu voucher :(');
      setModalVisible(true);
    }
  };

  const handleAmbos = async (tipo: string, nomeProduto: string) => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = user.id;

    if (!podeResgatarHoje(userId)) {
      setErro("Você já resgatou um voucher hoje! Tente novamente amanhã.");
      setModalVisible(true);
      return; // bloqueia a criação e resgate
    }

    const criado = await handleCriarVoucher(tipo, nomeProduto);
    if (criado) {
      setModalVisible(true);
      await handleResgatar(userId);
    }
  };

  return (
    <div className="voucher-container">
      <h2>Meus Vouchers</h2>
      <div className="voucher-grid">
        {vouchersMock.map((voucher) => (
          <div className="voucher-card" key={voucher.id}>
            <img src={voucher.img} alt={voucher.nome} className="voucher-img" />
            <h4>{voucher.nome}</h4>
            <button
              className="pegar-btn"
              onClick={() => handleAmbos(voucher.tipo, voucher.nome)}
            >
              Pegar
            </button>
          </div>
        ))}
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setModalVisible(false)}>×</button>
            {voucherResgatado?.code ? (
              <>
                <h3>Voucher Resgatado!</h3>
                <img src={arroz} className="voucher-img-large" alt="Voucher Selo" />
                <p className="voucher-code">Código: {voucherResgatado.code}</p>
                <p>Produto: {voucherResgatado.produto}</p>
                <p>Tipo: {voucherResgatado.type}</p>
              </>
            ) : (
              <p>{erro}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Voucher;
