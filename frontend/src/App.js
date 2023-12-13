import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js'
import {BrowserRouter, Route,Routes} from "react-router-dom"
import webfont from 'webfontloader';
import Home from './component/Home/Home.js'
import Footer from './component/layout/Footer/Footer.js'
import useProducts from './customHooks/useProducts.js';
import { addProducts } from './slices/Product.js';
import { useDispatch } from 'react-redux'
import Login from './component/Auth/Login.js';
import Profile from './component/User/Profile/Profile.js';
import Products from './component/products/AllProducts/Products.js'
import ProductDetails from './component/products/productDetails/ProductDetails.js';
import Cart from './component/products/cart/Cart.js';
import UserAddress from './component/products/UserAddress/UserAddress.js';
import { Toaster } from 'react-hot-toast';
import Loader from './utils/loader/Loader.js';



function App() {
  const data = useProducts();
  const dispatch = useDispatch();



  if(data?.topRatedProducts){
    dispatch(addProducts(data.topRatedProducts));
  }
  
  useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    
  },[])

  return (
      <BrowserRouter>
        <Header/>
            <Routes>
              <Route path='/auth' element={<Login/>} />
              <Route path='/' element={<Home/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/loader' element={<Loader/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/products' element={<Products/>} />
              <Route path='/productDetails/:productId' element={<ProductDetails/>} />
              <Route path='/order/address' element={<UserAddress/>} />
            </Routes>
            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
