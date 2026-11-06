import React from 'react'
import styles from './CardItem.module.css'

export const ProductsGallery = ({ children }) => {
  return (
    <div className={styles.container}>
      <h2>Galería</h2>
      <div className={styles.grid}>
        {children}
      </div>
    </div>
  )
}

const CardItem = ({ data, children, isDetail }) => {
  return (
    /* Si isDetail es true, se aplican ambas clases. Si no, solo .card */
    <div className={`${styles.card} ${isDetail ? styles.cardDetalle : ''}`}>
       
        {/* COLUMNA IZQUIERDA: Imagen */}
        <img 
          className={styles.cardImage}
          src={data.img} 
          alt={data.title || "Imagen del producto"} 
        />
        
        {/* COLUMNA DERECHA CONTENEDORA: Agrupa todos los textos y botones */}
        <div className={isDetail ? styles.rightColumnDetail : styles.normalCardContent}>
            <p className={styles.productTitle}>Artículo: {data?.category}</p>
            <p className={styles.productPrice}>Precio: ${data?.price}</p>
            <p className={styles.productStock}>Stock: {data?.stock}</p>
            
            {/* El botón azul solo se muestra en la galería si no es vista de detalle */}
            {!isDetail && <button className={styles.btnVerProducto}>Ver Producto</button>}
            
            {children}
        </div>
    </div>
  )
}

export default CardItem;