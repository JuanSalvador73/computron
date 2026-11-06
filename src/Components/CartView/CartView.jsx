import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link, useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import styles from './CartView.module.css' // Módulo de estilos exclusivo de CartView

const CartView = () => {
  const { cart, removeItem, clear, total } = useContext(CartContext)
  const navigate = useNavigate()

  const preConfirm = () => {
    Swal.fire({
      title: '¿Estás seguro de borrar el carrito?',
      showDenyButton: true,
      denyButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        clear()
      }
    })
  }

  if (cart.length === 0) {
    return (
      <div className={styles['cart-empty']}>
        <h2>Tu carrito está vacío</h2>
        <Link className='btn btn-primary' to='/'>Volver a la tienda</Link>
      </div>
    )
  }

  return (
    
    <div className={styles['cart-main-container']}>
      
      <div className={styles['cart-card-wrapper']}>
        <div className={styles['resumen']}><h2>Resumen de su pedido</h2></div>
        
        {/* Cabecera estilo tabla de Desktop (Oculta automáticamente en móviles por CSS) */}
        
        <div className={styles['cart-table-header']}>
          <span>Artículo</span>
          <span>Detalle</span>
          <span>Cantidad</span>
          <span>Precio Unitario</span>
          <span>Subtotal</span>
          <span></span>
        </div>

        {/* Listado de Productos con fondo gris */}
        <div className={styles['cart-items-body']}>
          {cart.map((compra) => (
            <div key={compra.id} className={styles['cart-item-row']}>
              
              <div className={styles['item-img-box']}>
                <img src={compra.img} alt={compra.name} />
              </div>
              
              <div className={styles['item-text-detail']}>
                <span className={styles['mobile-label']}>Detalle</span>
                <span className={styles['item-value']}>{compra.category}</span>
              </div>
              
              <div className={styles['item-text-detail']}>
                <span className={styles['mobile-label']}>Cantidad</span>
                <span className={styles['item-value']}>{compra.quantity}</span>
              </div>
              
              <div className={styles['item-text-detail']}>
                <span className={styles['mobile-label']}>Precio Unitario</span>
                <span className={styles['item-value']}>${compra.price},00</span>
              </div>
              
              <div className={styles['item-text-detail']}>
                <span className={styles['mobile-label']}>Subtotal</span>
                <span className={styles['item-value']}>${compra.price * compra.quantity},00</span>
              </div>

              <div className={styles['item-action-box']}>
                <button type="button" className={styles['btn-remove']} onClick={() => removeItem(compra.id)}>
                  <span className={styles['desktop-icon']}>×</span>
                  <span className={styles['mobile-text']}>🗑️ Eliminar</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Sección Inferior Blanca (Totales y Acciones alineadas) */}
        <div className={styles['cart-footer-section']}>
          <div className={styles['total-box']}>
            <span className={styles['total-amount']}>Total a Pagar: ${total()},00</span>
          </div>
          
          <div className={styles['action-buttons-box']}>
            <button type="button" className={styles['btn-empty-cart']} onClick={preConfirm}>Vaciar Carro</button>
            <button type="button" className={styles['btn-complete-order']} onClick={() => navigate('/checkout')}>Completar Compra</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartView
