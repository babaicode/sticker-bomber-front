import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success">
      <h2>✅ Оплата успешно завершена!</h2>
      <p>Ваш платеж был обработан.</p>
      <button onClick={() => navigate('/')}>Вернуться на главную</button>
    </div>
  );
};

export default PaymentSuccess;
