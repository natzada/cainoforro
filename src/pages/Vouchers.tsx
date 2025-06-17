/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/VoucherList.css';

import arroz from '../assets/vale-arroz-doce.png'
import pipoca from '../assets/vale-pipoca-doce.png'
import espetinho from '../assets/vale-espetinho.png'
import tiro from '../assets/vale-tiro-ao-alvo.png'
import pesca from '../assets/vale-pesca.png'
import foto from '../assets/vale-foto.png'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [voucherResgatado, setVoucherResgatado] = useState<any | null>(null);
  const [erro, setErro] = useState('');

  const handleResgatar = async () => {
  const user = JSON.parse(localStorage.getItem('usuario') || '{}');
  const userId = user.id;

  if (!userId) {
    setErro("Usuário não autenticado. Faça login novamente.");
    setModalVisible(true);
    return;
  }

  try {
    const response = await axios.post(`http://localhost:8080/voucher/daily/2`);

    if (response.data.code) {
      setVoucherResgatado(response.data);
      setErro('Voucher resgatado com sucesso! 🎉 seu código é: ABC-098-XYZ');
      setErro('');
      setModalVisible(true);
    } else if (response.data.message) {
      const segundos = response.data.secondsLeft;
      const minutos = Math.floor(segundos / 60);
      setErro(`Você já resgatou um voucher hoje. Tente novamente em ${minutos} min.`);
      setModalVisible(true);
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    setErro('Não foi possível resgatar o seu voucher :(');
    setModalVisible(true);
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
            <button className="pegar-btn" onClick={handleResgatar}>Pegar</button>
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
                <img src="/assets/selo.png" className="voucher-img-large" />
                <p className="voucher-code">{voucherResgatado.code}</p>
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
