import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../../../slices/CartSlice';

const CartProduct = ({product}) => {
    // console.log(product);
    const dispatch =useDispatch();

    const deleteCartItemHandler = ()=>{
        dispatch(deleteCartItem(product?._id));
    }
  return (
    <div>
        <div className="cartPrroduct">
            <div className="productImage">
                <img src={product?.images[0]?.url} alt="" className='productImg'/>
            </div>
            <div className="namePriceAndbutton">
                <h2 className='cartItemProductName'>{product?.name}</h2>
                <h2 className='cartItmeProductPrice'>{`₹${product?.price}`}</h2>
                <div className="quantityAndButton">
                <div className="quantity">
                    <button>-</button>
                    <input type="text" />
                    <button>+</button>
                </div>
                <button className='removeCart' onClick={deleteCartItemHandler}>Remove Item</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartProduct