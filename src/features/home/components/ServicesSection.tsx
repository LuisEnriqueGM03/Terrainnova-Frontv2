import React from "react";

const services = [
  {
    icon: "bi bi-leaf",
    title: "Ecológico",
    desc: "Productos y soluciones amigables con el medio ambiente."
  },
  {
    icon: "bi bi-truck",
    title: "Envíos rápidos",
    desc: "Entrega eficiente y segura a todo el país."
  },
  {
    icon: "bi bi-shield-check",
    title: "Calidad garantizada",
    desc: "Solo productos certificados y de alta calidad."
  },
  {
    icon: "bi bi-people",
    title: "Atención personalizada",
    desc: "Soporte y asesoría para cada cliente."
  }
];

const ServicesSection: React.FC = () => (
  <section className="services-section">
    <h2 className="services-title">Servicios de TerraInnova</h2>
    <div className="services-grid">
      {services.map((srv, idx) => (
        <div className="service-card" key={idx}>
          <i className={srv.icon + " service-icon"}></i>
          <h3 className="service-title">{srv.title}</h3>
          <p className="service-desc">{srv.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ServicesSection; 