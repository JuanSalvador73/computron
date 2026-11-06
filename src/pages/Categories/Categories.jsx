import React from 'react'
import { useState, useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig'
// MODIFICADO: Importamos CardItem y el nuevo contenedor responsivo ProductsGallery
import CardItem, { ProductsGallery } from '../../Components/CardItem/CardItem' 
import { Link, useParams } from 'react-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import LoaderComponent from '../../Components/LoaderComponent/LoaderComponent'

const Categories = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  // Funcion UseEffect (Dejamos la logica de Firebase intacta)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(
          collection(db, "items"),
          where("category", "==", category)
        );
  
        const querySnapshot = await getDocs(q);
  
        const itemsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setItems(itemsArray);
  
      } catch (error) {
        console.error("Error al cargar los documentos: ", error);
      }
    };
  
    if (category) fetchItems();
  }, [category]);

  // OPTIMIZACIÓN: Si está cargando, mostramos el Loader primero de forma limpia
  if (loading) {
    return <LoaderComponent text='Cargando Info...' />;
  }

  // Retorno del resultado con la estructura responsive
  return (
    <ProductsGallery>
        {items.map((item) => (
          <Link 
            to={`/product/${item.id}`} 
            key={item.id} 
            /* CORRECCIÓN CRÍTICA: display: 'block' neutraliza a Bootstrap y activa el CSS Grid */
            style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'block' }}
          >
             <CardItem data={item} />
          </Link>
        ))}
    </ProductsGallery>
  );
};

export default Categories;