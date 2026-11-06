import React, { useState } from 'react'
import styles from './ItemCount.module.css' // Importamos estilos modulares para este componente

const ItemCount = ({ initial, stock, onAdd }) => {
    const [count, setCount] = useState(initial)

    const sumar = () => {
        if (count < stock) {
            setCount(count + 1)
        }
    }

    const restar = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    const comprar = () => {
        onAdd(count)
    }

    return (
        <>
            {stock > 0 ? (
                <div className={styles.counterContainer}>
                    {/* Fila de controles de cantidad */}
                    <div className={styles.selectorRow}>
                        <button 
                            className={`btn ${styles.btnMinus}`} 
                            onClick={restar} 
                            disabled={count === 0}
                        >-</button>
                        <span className={styles.countSpan}>{count}</span>
                        <button 
                            className={`btn ${styles.btnPlus}`} 
                            onClick={sumar} 
                            disabled={count === stock}
                        >+</button>
                    </div>
                    
                    {/* Botón de compra independiente abajo */}
                    <button 
                        className={`btn btn-primary ${styles.btnComprar}`}  
                        disabled={count === 0 || stock === 0} 
                        onClick={comprar}
                    >
                        Comprar
                    </button>
                </div>
            ) : (
                <p className={styles.noStock}>No hay stock disponible</p>
            )}
        </>
    )
}

export default ItemCount
