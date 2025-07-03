import React from "react";
import { Helmet } from 'react-helmet-async';
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
    <Helmet>
      <title>Terrainnova | Productos ecológicos y sostenibles</title>
      <meta name="description" content="Bienvenido a Terrainnova, tu tienda de productos ecológicos y sostenibles. Descubre nuestro catálogo, servicios y compromiso con el medio ambiente." />
      <meta property="og:title" content="Terrainnova | Productos ecológicos y sostenibles" />
      <meta property="og:description" content="Bienvenido a Terrainnova, tu tienda de productos ecológicos y sostenibles. Descubre nuestro catálogo, servicios y compromiso con el medio ambiente." />
      <meta property="og:image" content="/logo.webp" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://terrainnova.com/" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Terrainnova | Productos ecológicos y sostenibles" />
      <meta name="twitter:description" content="Bienvenido a Terrainnova, tu tienda de productos ecológicos y sostenibles. Descubre nuestro catálogo, servicios y compromiso con el medio ambiente." />
      <meta name="twitter:image" content="/logo.webp" />
    </Helmet>
    <main>
      <HeroSection />
      <ServicesSection />
      <ProductosDestacados />
      <ComoFuncionamos />
      <FAQs />
      <Contactanos />
      <ChatWidget />
    </main>
    <Footer />
  </>
);

export default HomePage; 