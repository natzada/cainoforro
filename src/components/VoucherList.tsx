import React, { useState, useEffect } from 'react';
import './VoucherList.css';

interface Voucher {
    id: number;
    code: string;
    userId: number;
    redeemed: boolean;
    type: 'ARROZ_DOCE' | 'PIPOCA_DOCE' | 'ESPETINHO' | 'TIRO_AO_ALVO' | 'PESCA' | 'FOTO_NA_CABINE'; 
}

interface VoucherListProps {
    userId: number;
}

const VoucherList: React.FC<VoucherListProps> = ({ userId }) => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/vouchers?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar vouchers');
                }
                const data = await response.json();
                setVouchers(data);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchVouchers();
    }, [userId]);

    const getVoucherImage = (type: string) => {
        switch(type) {
            case 'ARROZ_DOCE': return '/images/arroz_doce.png'; // coloque suas imagens na pasta public/images
            case 'PIPOCA_DOCE': return '/images/pipoca_doce.png';
            case 'ESPETINHO': return '/images/espetinho.png';
            case 'TIRO_AO_ALVO': return '/images/tiro_alvo.png';
            case 'PESCA': return '/images/pesca.png';
            case 'FOTO_NA_CABINE': return '/images/foto_cabine.png';
            default: return '';
        }
    };

    return (
        <div className="voucher-container">
            <h2>Meus Vouchers</h2>
            <div className="voucher-grid">
                {vouchers.map(voucher => (
                    <div key={voucher.id} className="voucher-card">
                        <img src={getVoucherImage(voucher.type)} alt="Voucher" className="voucher-img" />
                        <button className="pegar-btn" onClick={() => setSelectedVoucher(voucher)}>PEGAR</button>
                    </div>
                ))}
            </div>

            {selectedVoucher && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setSelectedVoucher(null)}>X</button>
                        <h3>Informe o código no caixa</h3>
                        <img src={getVoucherImage(selectedVoucher.type)} alt="Voucher" className="voucher-img-large" />
                        <p className="voucher-code">{selectedVoucher.code}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoucherList;
