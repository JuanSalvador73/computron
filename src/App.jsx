import React from 'react'
import styles from './App.module.css';
import { Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Pages
import Home from './pages/Home/Home';
import Enterprise from './pages/Enterprise/Enterprise';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import User from './pages/User/User';
import Form from './Components/Form/Form';
import Product from './pages/Product/Product'
import Categories from './pages/Categories/Categories';
// Components
import NavbarBS from './Components/NavbarBS/NavbarBS';
import { CartProvider } from './context/CartContext';
import CartContainer from './Components/CartContainer/CartContainer';
import Checkout from './Components/Checkout/Checkout';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <div>
      <CartProvider>
          <NavbarBS />
          <div className={styles.container}>
            
          </div>

          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/enterprise' element={<Enterprise/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/form' element={<Form/>}/> {/*Este lleva al shop*/}
            <Route path='/user/:id' element={<User/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/categories/:category' element={<Categories/>}/> {/*Todos los productos*/}
            <Route path='/cart' element={<CartContainer/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
      </CartProvider>
      <Footer />


    </div>
  )
}

export default App