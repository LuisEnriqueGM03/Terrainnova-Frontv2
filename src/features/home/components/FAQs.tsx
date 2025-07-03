import React, { useState } from 'react';

const faqs = [
  {
    pregunta: '¿Cómo uso el compost?',
    respuesta: 'Puedes mezclar el compost con la tierra de tus plantas o jardín para mejorar la fertilidad y salud del suelo.'
  },
  {
    pregunta: '¿En qué ciudades entregan?',
    respuesta: 'Realizamos entregas en todas las ciudades principales del país. Consulta cobertura al finalizar tu compra.'
  },
  {
    pregunta: '¿Cómo sé si mi pedido fue recibido?',
    respuesta: 'Recibirás un correo de confirmación y podrás ver el estado en tu perfil.'
  },
  {
    pregunta: '¿Se puede pagar contra entrega?',
    respuesta: 'Sí, ofrecemos pago contra entrega en algunas zonas. Consulta disponibilidad al finalizar tu compra.'
  },
];

const FAQs: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faqs-section">
      <div className="faqs-container">
        <h2 className="faqs-title">¿Preguntas frecuentes?</h2>
        <div className="faqs-list">
          {faqs.map((faq, idx) => (
            <div className={`faq-item${openIdx === idx ? ' open' : ''}`} key={faq.pregunta}>
              <button className="faq-question" onClick={() => toggle(idx)}>
                <span>{faq.pregunta}</span>
                <span className="faq-icon">{openIdx === idx ? '−' : '+'}</span>
              </button>
              <div className="faq-answer-wrapper" style={{ maxHeight: openIdx === idx ? 200 : 0 }}>
                <div className="faq-answer">{faq.respuesta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs; 