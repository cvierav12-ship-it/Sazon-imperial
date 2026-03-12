import { useState } from 'react';
import './ServiceCard.css';

export default function ServiceCard({ title, image, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`service-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="service-card__image-container">
        <img
          src={image}
          alt={title}
          className="service-card__image"
        />
        <div className="service-card__overlay" />
      </div>
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <span className={`service-card__cta ${isHovered ? 'visible' : ''}`}>
          Ver más
        </span>
      </div>
    </article>
  );
}
