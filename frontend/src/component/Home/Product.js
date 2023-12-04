import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactStarts from 'react-rating-stars-component'

const options = {
    edit:false,
    color1:"white",
    color2:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth < 600 ? 15 : 25,
    value:2.5,
    isHalf:true,
}

const Product = ({product}) => {
  return (
    <Fragment>
       <Link className='product_card' to={`/productDetails/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStarts {...options}/> <span>(256 reviews)</span>
            </div>
            <span>₹{ product.price}</span>
       </Link>
    </Fragment>
  )
}

export default Product