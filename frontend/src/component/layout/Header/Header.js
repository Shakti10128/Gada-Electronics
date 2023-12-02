import React, { useState } from 'react'
import { TfiMenu } from "react-icons/tfi";
import { GrClose } from "react-icons/gr";
import logo from '../../../images/logo.png'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { removeTokenfromState } from '../../../slices/UserSlice';
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineLogout } from "react-icons/ai";
import uesrImage from '../../../images/user.png'

import './Header.css'

const Header = () => {
  const isAuth = useSelector(state=>state.user.Token);
  // console.log(isAuth)
  const [istrue,setIstrue] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // maintaining this state for media query 
  const handleOpenCloseMenu = ()=>{
    setIstrue(!istrue);
  }

  const handleNavRoutes = (path)=>{
    // if inner width is less than 600 then only set istrue = true else skip it
    if(window.innerWidth < 600){
      handleOpenCloseMenu();
    }
    navigate(`${path}`);
  }

  // logOut Handler
  const logOutHandler = ()=>{
    // removing token from the user state
    dispatch(removeTokenfromState());
    localStorage.removeItem("Token")
  }


  return (
    <div>
      <div className={`header ${istrue ? "show" : "hide"}`}>
        {istrue ? 
          <GrClose onClick={()=>setIstrue(!istrue)} className={`openMenu`} /> : 
          <TfiMenu onClick={()=>setIstrue(!istrue)} className={`closeMenu`} />}
        <div className='logo'>
          <img src={logo} alt="Logo" className='logo_img' onClick={()=>handleNavRoutes('/')} />
          <h1 className="brandName">Gada Electronics</h1>
        </div>
        <div className={`navbars`}>
          <ul>
            <li onClick={()=>handleNavRoutes('/')}>Home</li>
            <li onClick={()=>handleNavRoutes('/products')}>Products</li>
            <li onClick={()=>handleNavRoutes('/contact')}>Contact</li>
            <li onClick={()=>handleNavRoutes('/about')}>About Us</li>
          </ul>
        </div>

        <div className='user_info'>
          {
            !isAuth && <button className='login' onClick={()=>handleNavRoutes('/auth')}>
            Log In </button>
          }
          {
            !isAuth && <button className='signup' onClick={()=>handleNavRoutes('/auth')}>
            Sing Up </button>
          }
          {
            isAuth && window.innerWidth > 600 ? (<TiShoppingCart className='cart'onClick={()=>handleNavRoutes('/cart')}/>) : ""
          }

          {
           isAuth && window.innerWidth > 600 ? 
           (<div className='user_image' onClick={()=>handleNavRoutes('/profile')}>
              <img src={uesrImage} alt="user_image" className='user_profile' />
            </div>)
            : isAuth ?
           ( <button className='signup' onClick={()=>handleNavRoutes('/profile')}>
            Profile </button>) : ""
          }
          {
            isAuth && window.innerWidth < 600 ? (<button className='logout' onClick={logOutHandler}>
            Log Out </button>) : isAuth ? <AiOutlineLogout  className='logout_icon' onClick={logOutHandler}/> : ""
          }
          
        </div>
      </div>
    </div>
  )
}

export default Header