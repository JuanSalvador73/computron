import React from 'react'
import { useState, useEffect } from 'react';
// IMPORTANTE: Importamos CardItem y el contenedor responsive
import CardItem, { ProductsGallery } from '../../Components/CardItem/CardItem';
import { Link } from 'react-router';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const Home = () => {
  const [items, setItems] = useState([]); 

  // Importante: Tenemos que mantener la logica de Firebase, NO tocarla
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(db, "items")); 

        const querySnapshot = await getDocs(q);

        const itemsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(itemsArray); 

      } catch (error) {
        console.error("Error al cargar los documentos: ", error);
      }
    };

    fetchItems();
  }, []);

  // Retorno del componente con la estructura responsive, ver como se ve en browser
  return (
    <ProductsGallery>
      {items.map((item) => (
        /* CORRECCIÓN CRÍTICA: Añadimos display: 'block' y ancho completo al Link para neutralizar Bootstrap */
        <Link 
          to={`/product/${item.id}`} 
          key={item.id}
          style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'block' }}
        >
          <CardItem data={item} />
        </Link>
      ))}
    </ProductsGallery>
  )
}

export default Home;