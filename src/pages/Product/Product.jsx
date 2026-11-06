import React from 'react'
import { useParams } from 'react-router'
import styles from './Product.module.css'
import { useState, useEffect, useContext } from 'react'
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import CardItem from "../../Components/CardItem/CardItem"
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router'
import  ItemCount  from '../../Components/ItemCount/ItemCount'

const Product = ({detail}) => {
    //const contexto = useContext(CartContext)
    const { id } = useParams();
    const [item, setItem] = useState([]);  // Se hizo cambios en este se puso null en []
    const [purchase, setPurchase] = useState(false)


//Context
const {cart, addItem, getItemQty } = useContext(CartContext)

//Function Add
const onAdd = (cantidad) => {
  addItem(item, cantidad)   // Se hizo cambios en este cambiando item por detail
  setPurchase(true)

  console.log('item', item);

}

//Diferencia entre el stock y el FireBase
const stockActualizado = item.stock - getItemQty(item.id)
    


useEffect(() => {
  const fetchItem = async () => {
    try{
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          setItem({ id: docSnap.id, ...docSnap.data() });
        }
    } catch(error){
        console.error("Error while trying fetching document: ", error);
    }
  };
  if(id) fetchItem();

}, [id]);

  return (
  <div className={styles.container}>
      <h2>Detalle del Producto</h2>
      <CardItem data={item} isDetail={true}>
        {/* Dejamos solo los componentes interactivos como children */}
        <p className={styles.productDetailText}>Producto: {item?.detail}</p>
        
        {purchase 
          ? <div className={styles.purchaseActionsContainer}>
              <Link className={styles.btnAction} to='/'>Seguir Comprando</Link>
              <Link className={styles.btnAction} to='/cart'>Ir al Carrito</Link>
            </div> 
          : <ItemCount stock={stockActualizado} initial={1} onAdd={onAdd}/>
        }
      </CardItem>
  </div>
  )
}

export default Product