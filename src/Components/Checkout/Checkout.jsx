import { useState, useContext } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { Link } from 'react-router'
import EmptyCart from '../EmptyCart/EmptyCart'
import { CartContext } from '../../context/CartContext'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import styles from './Checkout.module.css' // Importa su propio CSS exclusivo

import visaLogo from '../../assets/img/visa.png'
import mastercardLogo from '../../assets/img/mastercard.png'
import paypalLogo from '../../assets/img/paypal.png'
import mercadopagoLogo from '../../assets/img/mercadopago.png'

const Checkout = () => {
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(false)
  const { cart, total, clear, removeItem } = useContext(CartContext)
  const { register, handleSubmit, formState: { errors }, getValues } = useForm()

  const terminarCompra = (data) => {
    setLoading(true)
    const { name, lastname, address, email } = data

    const orden = {
      comprador: { name, lastname, address, email },
      carro: cart,
      total: total(),
      fecha: serverTimestamp()
    }

    const orderColl = collection(db, 'orders')
    addDoc(orderColl, orden)
      .then((res) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Pedido procesado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          setOrderId(res.id)
          clear()
        })
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  // Vista de éxito Centrada, indica si la operacion tuvo exito)
  if (orderId) {
    return (
      <div className={styles['success-page']}>
        <div className={styles['success-card']}>
          <h1>¡Muchas gracias por tu compra!</h1>
          <h4>Tu orden es: <span className={styles['order-id-highlight']}>{orderId}</span></h4>
          <Link className='btn btn-dark' style={{ width: '100%', padding: '0.8rem' }} to='/'>Volver a home</Link>
        </div>
      </div>
    )
  }

  if (!cart.length && !orderId) {
    return <EmptyCart />
  }

  return (
    <div className={styles['checkout-container']}>
      <div className={styles['checkout-layout']}>
        
        {/* Columna: Formulario */}
        <div className={styles['form-column']}>
          <h2 className={styles['form-title']}>Complete sus datos</h2>
          
          <form onSubmit={handleSubmit(terminarCompra)} className={styles['checkout-form']}>
            <div className={styles['form-grid']}>
              <div>
                <input type='text' placeholder='Ingresa tu nombre' {...register("name", { required: true, minLength: 3 })} />
                {errors?.name && <span className={styles['error-msg']}>Por favor complete este campo (mín. 3 letras)</span>}
              </div>
              <div>
                <input type='text' placeholder='Ingresa tu apellido' {...register("lastname", { required: true, minLength: 2 })} />
                {errors?.lastname && <span className={styles['error-msg']}>Por favor complete este campo</span>}
              </div>
              <div>
                <input type='text' placeholder='Ingresa su direccion' {...register("address", { required: true, minLength: 10, maxLength: 35 })} />
                {errors?.address && <span className={styles['error-msg']}>Por favor ingresa una dirección válida</span>}
              </div>
              <div>
                <input type='email' placeholder='Ingresa tu correo' {...register("email", { required: true })} />
                {errors?.email && <span className={styles['error-msg']}>Por favor complete este campo</span>}
              </div>
              <div className={styles['full-width-input']}>
                <input type='email' placeholder='Repetí tu correo' {...register("secondemail", { required: true, validate: { equalsMails: value => value === getValues().email } })} />
                {errors?.secondemail?.type === "required" && <span className={styles['error-msg']}>Por favor complete este campo</span>}
                {errors?.secondemail?.type === "equalsMails" && <span className={styles['error-msg']}>Los correos no coinciden</span>}
              </div>
            </div>

            <div className={styles['payment-methods']}>
              <img src={visaLogo} alt="Visa" className={styles['payment-img-logo']} />
              <img src={mastercardLogo} alt="MasterCard" className={styles['payment-img-logo']} />
              <img src={paypalLogo} alt="PayPal" className={styles['payment-img-logo']} />
              <img src={mercadopagoLogo} alt="Mercado Pago" className={styles['payment-img-logo']} />
            </div>

            <div className={styles['cart-actions']}>
              <button type='submit' className={styles['btn-complete-order']} disabled={loading}>
                {loading ? 'Cargando compra...' : 'Terminar Compra'}
              </button>
            </div>
          </form>
        </div>

        {/* Columna: Tarjeta Resumen */}
        <div className={styles['summary-column']}>
          <div className={styles['order-summary-card']}>
            <div className={styles['card-header']}>
              <h2>Resumen del pedido</h2>
            </div>

            <div className={styles['cart-items-list']}>
              {cart.map((compra) => (
                <div key={compra.id} className={styles['cart-item']}>
                  <div className={styles['item-details']}>
                    <img src={compra.img} alt={compra.name} className={styles['item-img']} />
                    <div className={styles['item-info']}>
                      <span className={styles['item-name']}>{compra.name}</span>
                      <span className={styles['item-quantity']}>Cantidad: {compra.quantity}</span>
                    </div>
                  </div>
                  <div className={styles['item-pricing']}>
                    <span className={styles['item-price']}>${compra.price * compra.quantity},00</span>
                    <button type="button" className={styles['btn-remove']} onClick={() => removeItem(compra.id)}>×</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles['cart-total-section']}>
              <span className={styles['total-label']}>Total a Pagar:</span>
              <span className={styles['total-amount']}>${total()},00</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout
