import React from 'react';
import { Helmet } from 'react-helmet-async';
import NosotrosHero from '../components/NosotrosHero';
import SobreNosotros from '../components/SobreNosotros';
import MisionVision from '../components/MisionVision';
import GaleriaCarrusel from '../components/GaleriaCarrusel';
import Footer from '../../../shared/components/Footer';

const NosotrosPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Terrainnova</title>
        <meta name="description" content="Conoce la historia, misión y visión de Terrainnova. Descubre nuestro compromiso con la sostenibilidad y el medio ambiente." />
        <meta property="og:title" content="Sobre Nosotros | Terrainnova" />
        <meta property="og:description" content="Conoce la historia, misión y visión de Terrainnova. Descubre nuestro compromiso con la sostenibilidad y el medio ambiente." />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://terrainnova.com/nosotros" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre Nosotros | Terrainnova" />
        <meta name="twitter:description" content="Conoce la historia, misión y visión de Terrainnova. Descubre nuestro compromiso con la sostenibilidad y el medio ambiente." />
        <meta name="twitter:image" content="/logo.webp" />
      </Helmet>
      <main>
        <NosotrosHero />
        <SobreNosotros />
        <MisionVision />
        <GaleriaCarrusel />
      </main>
      <Footer />
    </>
  );
};

export default NosotrosPage; 