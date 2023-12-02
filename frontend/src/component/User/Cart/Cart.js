import React from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state=>state.user.Token);
  if(!isAuthenticated){
      navigate('/');
  }
  return (
    <div>Cart</div>
  )
}

export default Cart