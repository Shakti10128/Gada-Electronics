import React from 'react'
import './Cart.css'
import { useSelector } from 'react-redux';
import CartProduct from './CartProduct';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate =useNavigate();

    const cartItems = useSelector(state=>state.cart.cartItems)
    let totalPrice = 0;
    cartItems?.forEach((item)=>totalPrice+=item?.price)
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
            <h2>Total Price: {totalPrice}</h2>
            <div className='itemsDetails'>
                <h3>Items: {cartItems?.length}</h3>
                <h3>Quantity: {cartItems?.length}</h3>
                <h3>Tax Price: {cartItems?.length * 50}</h3>
                <h3>Shipping Price: 70</h3>
            </div>
            <button className='buyNow' onClick={()=>navigate('/order/address')}>Buy Now</button>
        </div>
    </div>
  )
}

export default Cart