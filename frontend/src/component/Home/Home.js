import React, { Fragment} from 'react'
import {CgMouse} from 'react-icons/cg'
import Product from './Product.js'
import MetaData from '../layout/MetaData.js'
import { useSelector } from 'react-redux'

import './Home.css'
import Loader from '../../utils/loader/Loader.js'

export const ProductContainer = ({products})=>{
  return(
    <div className="container" id="container">
          {
            products && products.map((product)=>(
              <Product product={product} key={product._id}/>
            ))
          }
        </div>
  )
}

const Home = () => {

    const {products} = useSelector(state=>state.product);
    // console.log(products)

  return (
    <>
    {products ? 
        <div>
          <MetaData title={"Gada Electronics"}/>

          <div className='banner'>
              <p>Welcome To <span>Gada Electronics </span> </p>
              <h1>FIND AMAZING ELECTRONICS PRODUCTS BELOW</h1>

              <a href="#container">
                  <button>
                      Scroll <CgMouse className='mouseIcon'/>
                  </button>
              </a>
          </div>

          <h1 className='home_heading'>Popular Products</h1>

          <ProductContainer products={products}/>

        </div> : <Loader/>}
    </>
  )
}

export default Home