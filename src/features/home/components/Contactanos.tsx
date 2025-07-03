import React from 'react';

const Contactanos: React.FC = () => {
  return (
    <section className="contactanos-section">
      <div className="contactanos-container">
        <h2 className="contactanos-title">Contáctanos</h2>
        <p className="contactanos-desc">
          ¿Tienes dudas, sugerencias o necesitas ayuda? Escríbenos y te responderemos lo antes posible.<br />
          También puedes enviarnos un correo a <a href="mailto:terrainnova@gmail.com">terrainnova@gmail.com</a>.
        </p>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=terrainnova@gmail.com"
          className="contactanos-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar correo a terrainnova@gmail.com
        </a>
      </div>
    </section>
  );
};

export default Contactanos; 