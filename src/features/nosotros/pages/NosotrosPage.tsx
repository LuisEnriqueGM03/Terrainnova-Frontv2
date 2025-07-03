import React from 'react';
import NosotrosHero from '../components/NosotrosHero';
import SobreNosotros from '../components/SobreNosotros';
import MisionVision from '../components/MisionVision';
import GaleriaCarrusel from '../components/GaleriaCarrusel';
import Footer from '../../../shared/components/Footer';

const NosotrosPage: React.FC = () => {
  return (
    <>
      <NosotrosHero />
      <SobreNosotros />
      <MisionVision />
      <GaleriaCarrusel />
      <Footer />
    </>
  );
};

export default NosotrosPage; 