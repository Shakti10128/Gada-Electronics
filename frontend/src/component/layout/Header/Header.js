import React, { useState } from 'react'
import { TfiMenu } from "react-icons/tfi";
import { GrClose } from "react-icons/gr";
import logo from '../../../images/logo.png'
import { useNavigate } from 'react-router-dom';

import './Header.css'

const Header = () => {
  const [istrue,setIstrue] = useState(false);

  const navigate = useNavigate();

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


  return (
    <div>
      <div className={`header ${istrue ? "show" : "hide"}`}>
        <div className='logo'>
          <img src={logo} alt="Logo" className='logo_img' onClick={()=>handleNavRoutes('/')} />
        </div>
        {istrue ? 
          <GrClose onClick={()=>setIstrue(!istrue)} className={`openMenu`} /> : 
          <TfiMenu onClick={()=>setIstrue(!istrue)} className={`closeMenu`} />}
        <div className={`navbars`}>
          <ul>
            <li onClick={()=>handleNavRoutes('/home')}>Home</li>
            <li onClick={()=>handleNavRoutes('/products')}>Products</li>
            <li onClick={()=>handleNavRoutes('/contact')}>Contact</li>
            <li onClick={()=>handleNavRoutes('/about')}>About Us</li>
          </ul>
        </div>

        <div className='user_info'>
          <button className='login' onClick={()=>handleNavRoutes('/login')}>
            Log In
          </button>
          <button className='signup' onClick={()=>handleNavRoutes('/signup')}>
            Sing Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header