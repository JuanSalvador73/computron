import { useEffect, useState } from "react"
import { createContext } from "react";

export const CartContext = createContext();

//Local Storage
const cartLS = JSON.parse(localStorage.getItem('carro')) || []

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(cartLS)


//Local Storage, para probar el sitio y memoria
useEffect(()=>{
    localStorage.setItem('carro', JSON.stringify(cart))
}, [cart])

//Aqui va la funcion

//1.- Adjuntamos el item
  const addItem = (item, qty)=> {
    //console.log({item, qty})
    //  console.log(item, qty)
     //console.log({...item, quantity: qty})
     if(isInCart(item.id)){
        //existe
        setCart(
            cart.map((prod)=> {
                if(prod.id === item.id){
                    //sumar cantidades
                    return {...prod, quantity: prod.quantity + qty}
                }else{
                    //no modifico
                    return prod
                }
            })
        )
     }else{
         setCart([...cart,{...item, quantity: qty}])
      }
  }

//2.- Borrar cart
const clear = ()=> {
    setCart([])
}

//3.- Remover Item
const removeItem = (id)=> {
    setCart(cart.filter((prod)=> prod.id !==id))
}

//4.- Revisa si el cart tiene item o no
const isInCart = (id)=> {
    return cart.some((prod)=> prod.id === id)
}

//Total a Pagar
const total = ()=> {
    return cart.reduce((acc, prod)=> acc += prod.quantity * prod.price, 0)
}

const totalConImp = ()=> {
    return cart.reduce((acc, prod)=> acc += prod.quantity * prod.price, 1.5)
}


//Cantidad total de Items en el Carro de Compras
const cartQty = ()=> {
    return cart.reduce((acc, prod)=> acc += prod.quantity, 0)
}

//Llevar el inventario del Carro de Compras

const getItemQty = (id)=> {
    const prodInCart = cart.find((prod)=> prod.id === id)

    if(prodInCart){
        return prodInCart.quantity
    }else{
        return 0
    }
}


//Return
    return (
        <CartContext.Provider value={{cart, addItem, clear, removeItem, total, totalConImp,  cartQty, getItemQty}} >
            {children}
        </CartContext.Provider>
    )
}