import React, {useContext} from 'react'
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../context/CartContext';

const CardWidget = () => {
  const {cart, cartQty} = useContext(CartContext)
  console.log(cart)

  return (
    <div>
        <FaShoppingCart fontSize={"1.4rem"} />
        <Badge pill bg="danger">
            {cartQty()}
        </Badge>
    </div>
  )
}

export default CardWidget