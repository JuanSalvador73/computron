import React from 'react'
import styles from './Enteprise.module.css'
import bannerImg from '../../assets/img/enterprise-banner.jpg'; 

const Enterprise = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Empresa</h2>
      
      <div className={styles['content-wrapper']}>
        {/* Pusimos una imagen de red, en cuanto sea posible editarle en PS */}
        <div className={styles['image-box']}>
          <img 
            src={bannerImg} 
            alt="Nuestras oficinas y equipos de cómputo" 
            className={styles.banner}
          />
        </div>

        {/* Texto del contenido de la empresa */}
        <div className={styles['text-content']}>
          <p className={styles.paragraph}>
            En <strong>Computron</strong>, nos apasiona conectar a las personas y a las empresas con la mejor tecnología del mercado. Desde nuestros inicios, nos hemos especializado en la comercialización y distribución de equipos de cómputo de alto rendimiento, incluyendo desktops robustas, laptops versátiles, workstations avanzadas y monitores de última generación. Nuestro compromiso principal es brindar herramientas informáticas de calidad que potencien la productividad de nuestros clientes.
          </p>

          <p className={styles.paragraph}>
            Nos destacamos en el sector por ofrecer un catálogo rigurosamente seleccionado de las marcas líderes a nivel mundial. Sabemos que cada usuario tiene necesidades únicas; por ello, nuestro equipo de expertos está siempre disponible para asesorarte de manera personalizada, garantizando que encuentres el equipo ideal, ya sea para tareas de oficina, diseño profesional, desarrollo de software o entretenimiento gaming.
          </p>

          <p className={styles.paragraph}>
            La accesibilidad es uno de nuestros pilares fundamentales. En Computron creemos firmemente que la innovación tecnológica no debe ser un lujo inalcanzable. Por este motivo, renovamos constantemente nuestras promociones comerciales y disponemos de las mejores ofertas del mercado, asegurando una relación costo-beneficio inigualable y opciones de financiamiento adaptadas a tu presupuesto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enterprise;