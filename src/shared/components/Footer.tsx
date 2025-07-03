import React from 'react';
import logo from '../../assets/logo.webp';

const visaUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png';
const mastercardUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <img src={logo} alt="Terrainnova logo" className="footer-logo" style={{ width: 54, height: 54, objectFit: 'contain', background: 'none' }} />
          <div className="footer-brand-name">Terrainnova</div>
        </div>
        <nav className="footer-col footer-links" aria-label="Enlaces útiles">
          <div className="footer-title">Enlaces útiles</div>
          <a href="/catalogo">Productos</a>
          <a href="/nosotros">Sobre nosotros</a>
        </nav>
        <nav className="footer-col footer-social" aria-label="Redes sociales">
          <div className="footer-title">Redes sociales</div>
          <div className="footer-social-icons">
            <a href="https://www.instagram.com/terrainnova2025/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61576031994855" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            <a href="https://www.tiktok.com/@terrainnova2025" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
          </div>
        </nav>
        <section className="footer-col footer-payments" aria-label="Métodos de pago">
          <div className="footer-title">Métodos de pago</div>
          <div className="footer-payments-icons">
            <img src={visaUrl} alt="Visa" className="footer-payment-logo" />
            <img src={mastercardUrl} alt="Mastercard" className="footer-payment-logo" />
          </div>
        </section>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Terrainnova. Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer; 