import React from 'react';

const pasos = [
  {
    titulo: 'Realizar el registro',
    icono: <i className="bi bi-person-plus"></i>
  },
  {
    titulo: 'Elige tu producto',
    icono: <i className="bi bi-box"></i>
  },
  {
    titulo: 'Realiza tu pedido',
    icono: <i className="bi bi-cart-check"></i>
  },
  {
    titulo: 'Recibe tu compra',
    icono: <i className="bi bi-truck"></i>
  },
  {
    titulo: 'Disfruta y cuida el planeta',
    icono: <i className="bi bi-globe2"></i>
  },
];

const ComoFuncionamos: React.FC = () => {
  return (
    <section className="como-funcionamos-section">
      <h2 className="como-funcionamos-title">¿Cómo funcionamos?</h2>
      <div className="como-funcionamos-card-flujo">
        <div className="como-funcionamos-flow-min">
          {pasos.map((paso, idx) => (
            <React.Fragment key={paso.titulo}>
              <div className="como-funcionamos-step-min">
                <div className="como-funcionamos-circle-min">
                  {paso.icono}
                </div>
                <div className="como-funcionamos-step-title-min"><h3>{paso.titulo}</h3></div>
              </div>
              {idx < pasos.length - 1 && (
                <div className="como-funcionamos-arrow-min">
                  <i className="bi bi-arrow-right-circle"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionamos; 