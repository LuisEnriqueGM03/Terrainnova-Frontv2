import React, { useState } from "react";
import img1 from '../../../assets/1.webp';
import img2 from '../../../assets/2.webp';
import img3 from '../../../assets/3.webp';
import img4 from '../../../assets/4.webp';

const imagenes = [
  { src: img1, alt: 'Foto institucional 1: equipo de TerraInnova trabajando' },
  { src: img2, alt: 'Foto institucional 2: composta' },
  { src: img3, alt: 'Foto institucional 3: taller para las personas ' },
  { src: img4, alt: 'Foto institucional 4: composta en proceso ' },
];

const GaleriaCarrusel: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgActual, setImgActual] = useState<{ src: string, alt: string } | null>(null);

  const abrirModal = (img: { src: string, alt: string }) => {
    setImgActual(img);
    setModalOpen(true);
  };
  const cerrarModal = () => setModalOpen(false);

  return (
    <section className="galeria-carrusel-section">
      <h2 className="galeria-carrusel-title">Galería</h2>
      <div className="galeria-carrusel-list">
        {imagenes.map((img, i) => (
          <div key={i} className="galeria-carrusel-item" onClick={() => abrirModal(img)}>
            <img src={img.src} alt={img.alt} className="galeria-carrusel-img" loading="lazy" />
          </div>
        ))}
      </div>
      {modalOpen && imgActual && (
        <div className="galeria-modal-overlay" onClick={cerrarModal}>
          <div className="galeria-modal-content" onClick={e => e.stopPropagation()}>
            <button className="galeria-modal-close" onClick={cerrarModal}>&times;</button>
            <img src={imgActual.src} alt={imgActual.alt} className="galeria-modal-img" loading="lazy" />
          </div>
        </div>
      )}
    </section>
  );
};

export default GaleriaCarrusel;
