import React from "react";

const MisionVision: React.FC = () => (
  <section className="mision-vision-section">
    <div className="mision-vision-container">
      <div className="mision-vision-block">
        <div className="mision-vision-icon mision"><i className="bi bi-leaf"></i></div>
        <h3 className="mision-vision-title mision">Misión</h3>
        <p className="mision-vision-text">
          Ofrecer soluciones sostenibles para el manejo de residuos orgánicos mediante la producción y comercialización de compost 100% natural, a través de una plataforma digital que promueve la economía circular, fomenta la educación ambiental y facilita el acceso a productos ecológicos en Santa Cruz de la Sierra.
        </p>
      </div>
      <div className="mision-vision-block">
        <div className="mision-vision-icon vision"><i className="bi bi-eye"></i></div>
        <h3 className="mision-vision-title vision">Visión</h3>
        <p className="mision-vision-text">
          Ser una empresa reconocida como la entidad municipal líder en gestión integral de residuos sólidos de Bolivia, brindando servicios de calidad, con innovación tecnológica, sostenibilidad financiera, responsabilidad social y compromiso con las generaciones futuras.
        </p>
      </div>
    </div>
  </section>
);

export default MisionVision; 