import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 
import '../styles/global.css'; 

const Return: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button className="return-button" onClick={handleGoBack}>
      <FiArrowLeft size={20} />
      <span>Voltar</span>
    </button>
  );
};

export default Return;
