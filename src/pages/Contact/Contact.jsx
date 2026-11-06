import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from "../../firebase/firebaseConfig"
import styles from './Contact.module.css'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

const Contact = () => {
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const terminarCompra = (data) => {
    setLoading(true) 
    console.log(data, 'data del form')
   
    const { nombre, asunto, correo, mensaje } = data
   
    const orden = {
      comprador: { nombre, correo, asunto, mensaje },
      fecha: serverTimestamp(),
    }

    const orderColl = collection(db, 'entradas')
    addDoc(orderColl, orden)
      .then((res) => {
        setOrderId(res.id) 
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: '80vh' }}>
      
      {/* Condicional: Si ya existe un orderId, muestra el contenedor div de éxito estilizado */}
      {orderId ? (
        <div className="p-5 border-0 rounded-4 shadow-sm text-center bg-light my-auto" style={{ maxWidth: '650px', width: '100%' }}>
          <h3 className="fw-bold mb-4" style={{ color: '#28a745' }}>¡Su formulario se ha enviado con éxito!</h3>
          <p className="text-secondary mb-4">El identificador de su mensaje es: <strong>{orderId}</strong></p>
          <div className="d-flex justify-content-center mt-2">
            <Link className='btn btn-dark px-4 py-2' to='/'>Volver a home</Link>
          </div>
        </div>
      ) : (
        /* Si no se ha enviado, muestra el formulario */
        <div style={{ maxWidth: '750px', width: '100%' }}>
          {/* TÍTULO EDITADO: Ahora usa la clase CSS modular */}
          <h2 className={styles.title}>Complete los campos</h2>
          
          <form className='p-4 border rounded shadow-sm bg-light' onSubmit={handleSubmit(terminarCompra)}>
            
            <div className="mb-3">
              <label className="form-label fw-bold text-secondary text-start d-block">Nombre</label>
              <input className='form-control py-2' name='nombre' type='text' placeholder='Ingrese su nombre' {...register("nombre", { required: true, minLength: 3 })} />
              {errors?.nombre?.type === "required" && <span style={{ color: 'red', display: 'block', marginTop: '4px' }}>Por favor complete este campo</span>}
              {errors?.nombre?.type === "minLength" && <span style={{ color: 'red', display: 'block', marginTop: '4px' }}>El nombre debe contener mínimo 3 caracteres</span>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-secondary text-start d-block">Correo Electrónico</label>
              <input className='form-control py-2' name='correo' type='email' placeholder='Ingrese su correo' {...register("correo", { required: true })} />
              {errors?.correo?.type === "required" && <span style={{ color: 'red', display: 'block', marginTop: '4px' }}>Por favor complete este campo</span>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-secondary text-start d-block">Asunto</label>
              <input className='form-control py-2' name='asunto' type='text' placeholder='Escriba su asunto' {...register("asunto", { required: true, minLength: 2 })} />
              {errors?.asunto?.type === "required" && <span style={{ color: 'red', display: 'block', marginTop: '4px' }}>Por favor complete este campo</span>}
              {errors?.asunto?.type === "minLength" && <span style={{ color: 'red', display: 'block', marginTop: '4px' }}>El asunto debe contener mínimo 2 caracteres</span>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-secondary text-start d-block">Mensaje</label>
              <textarea className='form-control py-2' name='mensaje' rows="4" placeholder='Escriba su mensaje' {...register("mensaje", { required: true })}></textarea>
              {errors?.mensaje?.type === "required" && <span style={{ color: 'red', display: 'block', marginTop: '4px' }}>Por favor complete este campo</span>}
            </div>

            <div className="d-flex justify-content-center">
              <button type='submit' className='btn btn-success px-5 py-2 fw-semibold fs-5' style={{ minWidth: '250px' }} disabled={loading}>
                {loading ? 'Cargando Mensaje...' : 'Enviar Mensaje'}
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  )
}

export default Contact
