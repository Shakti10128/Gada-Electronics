import React from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state=>state.user.Token);
    if(!isAuthenticated){
        navigate('/');
    }
  return (
    <div>Profile</div>
  )
}

export default Profile