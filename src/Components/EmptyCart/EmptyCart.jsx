import React from 'react'
import { Link } from 'react-router'
import  styles from './EmptyCart.module.css'

const EmptyCart = () => {
  return (
    <div style={{
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      marginTop: '70px',
      marginBottom: '50px'
    }}>
      <img  className={styles['imgcat']} src='https://i.postimg.cc/fyhyShn1/image-447ee255.jpg' alt='error'/>
      <div>
        <h2 className='fw-bold'>Tu carro esta vacío</h2>
        <p className='text-muted mb-0'>
          No has agregado productos. Revisa nuestro catálogo
        </p>
      </div>
      <Link className='btn btn-dark' to='/'>Ir a Home</Link>
    </div>
  )
}

export default EmptyCart