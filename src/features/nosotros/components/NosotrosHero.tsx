import React from 'react';
import logo from '../../../assets/logo.webp';

const NosotrosHero: React.FC = () => {
  return (
    <section className="nosotros-hero-section">
      <div className="nosotros-hero-content">
        <img src={logo} alt="Terrainnova logo" className="nosotros-hero-logo" />
        <h1 className="nosotros-hero-title">TERRAINNOVA</h1>
      </div>
    </section>
  );
};

export default NosotrosHero; 