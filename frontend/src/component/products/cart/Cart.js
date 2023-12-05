import React from 'react'
import './Cart.css'
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct';

const Cart = () => {

    const cartItems = useSelector(state=>state.cart.cartItems)
    // console.log(cartItems)
  return (
    cartItems?.length === 0 ? <div className='noItemInCart'>
        <p>No Items In Cart</p>
        <span>✖</span>
    </div> :
    <div className='CartContainer'>
        <div className="leftCartDiv">
           {
            cartItems?.map((product)=>(
                <CartProduct product={product} key={product._id}/>
            ))
           }
        </div>
        <div className="rightCartDiv">
            right cart div
        </div>
    </div>
  )
}

export default Cart