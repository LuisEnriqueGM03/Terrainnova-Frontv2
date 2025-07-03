import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ProductosDestacados from '../components/ProductosDestacados';
import ComoFuncionamos from '../components/ComoFuncionamos';
import FAQs from '../components/FAQs';
import Contactanos from '../components/Contactanos';
import Footer from '../../../shared/components/Footer';
import ChatWidget from '../../../chat/widget/ChatWidget';

const HomePage: React.FC = () => (
  <>
    <HeroSection />
    <ServicesSection />
    <ProductosDestacados />
    <ComoFuncionamos />
    <FAQs />
    <Contactanos />
    <ChatWidget />
    <Footer />
  </>
);

export default HomePage; 