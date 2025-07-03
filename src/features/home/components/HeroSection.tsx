import React from "react";
import logo from "../../../assets/logo.webp";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Columna izquierda */}
        <div className="hero-left">
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.1rem, 5vw, 2.8rem)', fontWeight: 900 }}>
            <span className="hero-blanco">TerraInnova:</span>
            <span className="hero-cafe"> Revoluciona tu<br />Mundo Natural</span>
          </h1>
          <p className="hero-subtitle">
            Nutriendo la tierra, cosechando futuros
          </p>
          <p>
            Impulsamos la transformación ecológica desde casa, desde el campo o en las aulas. Ofrecemos fertilizantes orgánicos, kits educativos y soluciones sostenibles para mejorar tu suelo, reducir residuos y generar un impacto positivo.
          </p>
          {/* Botón solo visible en desktop */}
          <button className="hero-btn-blanco hero-btn-desktop" onClick={() => window.location.href = '/catalogo'}>
            <i className="bi bi-box-seam" style={{ marginRight: '8px', fontSize: '1.2em', verticalAlign: 'middle' }}></i>
            Ver productos
          </button>
        </div>
        {/* Columna derecha */}
        <div className="hero-right">
          <img
            src={logo}
            alt="Terrainnova logo"
            className="hero-logo"
          />
          <h2 className="hero-title">TERRAINNOVA</h2>
          <button className="hero-btn-blanco hero-btn-responsive" onClick={() => window.location.href = '/catalogo'}>
            <i className="bi bi-box-seam" style={{ marginRight: '8px', fontSize: '1.2em', verticalAlign: 'middle' }}></i>
            Ver productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
