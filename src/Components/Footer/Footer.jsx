import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-content']}>
        
        {/* Sección Izquierda: Info de la Tienda */}
        <div className={styles['footer-section']}>
          <h3 className={styles['footer-title']}>COMPUTRON</h3>
          <p className={styles['footer-text']}>
            Aplicación web para Desarrollo de proyecto de React Js en Coderhouse. 
            Curso para obtención de Certificado por Coderhouse.
          </p>
        </div>

        {/* Sección Derecha: Contacto */}
        <div className={styles['footer-section']}>
          <h3 className={styles['footer-title']}>CONTACTO</h3>
          <p className={styles['footer-text']}>
            📍 México, Plaza Coyoacán Local 48-B, Distrito Federal
          </p>
          <p className={styles['footer-text']}>
            ✉️ smendoza@saldesign1973.com
          </p>
        </div>

      </div>

      {/* Barra Inferior de Derechos y Redes */}
<div className={styles['footer-bottom']}>
  <span className={styles['copyright']}>
    © 2026 Todos los derechos reservados por: Computron
  </span>
  <div className={styles['social-icons']}>
    {/* Ícono de LinkedIn */}
    <a href="https://www.linkedin.com/in/salvadorm73" target="_blank" rel="noreferrer" className={styles['icon-link']}>
      <i className="bi bi-linkedin" style={{ fontSize: '1.3rem' }}></i>
    </a>
    
    {/* Ícono de GitHub */}
    <a href="https://github.com/JuanSalvador73" target="_blank" rel="noreferrer" className={styles['icon-link']}>
      <i className="bi bi-github" style={{ fontSize: '1.3rem' }}></i>
    </a>
  </div>
</div>
    </footer>
  );
};

export default Footer;
