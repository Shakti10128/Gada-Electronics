import React,{useState} from 'react'
import jethalalLoginImage from '../../images/jethalalLogin-removebg-preview.png'
import { useDispatch,useSelector } from 'react-redux'
import { addTokenInLocalStorage } from '../../slices/UserSlice.js'
import { useNavigate } from 'react-router-dom'

import './Login.css'


const Login = () => {


    // if Token exist then redirect to home page no need to show login or sign up page
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state=>state.user.Token);
    if(isAuthenticated){
        navigate('/');
    }


    const dispatch = useDispatch();

    const [isLogin,setIsLogin] = useState(true);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();

    const handleLoginForm = ()=>{
        setIsLogin(!isLogin);
    }

    // login sing Up user handler
    const loginSignup = async()=>{
        if(isLogin){
            try {
                const userData = {
                    email,
                    password
                }
                const response = await fetch("http://localhost:4000/api/v1/login",{
                    method:"POST",
                    body:JSON.stringify(userData),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const user = await response.json();
                dispatch(addTokenInLocalStorage(user.Token));
                localStorage.setItem("Token",JSON.stringify(user.Token));
                console.log(user);
                return;
            } catch (error) {
                console.log("Error in Log in");
                return;
            }
        }
        else if(!isLogin){
            try {
                if(password !== confirmPassword){
                    // add toast for password not matched
                    console.log("parssword not matched");
                    return;
                }
                const userData = {
                    name,
                    email,
                    password,
                }
                const response = await fetch("http://localhost:4000/api/v1/registerUser",{
                    method:"POST",
                    body:JSON.stringify(userData),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const user = await response.json();
                dispatch(addTokenInLocalStorage(user.Token));
                localStorage.setItem("Token",JSON.stringify(user.Token));
                console.log(user);
                return;
            } catch (error) {
                console.log("Error in Sign Up");
                return;
            }
        }
    }

  return (
    <div className='auth_container'>
        <div className="left_auth_div">
            <img src={jethalalLoginImage} alt="jethalal_Image" className='jethalalLoginImage'/>
        </div>

        <div className="right_auth_div">
            <div className="login_div">
                <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
                <div className='login_signup'>
                    {
                        !isLogin &&  <input type="name" required placeholder='Enter your name'
                        onChange={(e)=>setName(e.target.value)} />
                    }
                    <input type="email" required placeholder='Email'
                    onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" required placeholder='password'
                    onChange={(e)=>setPassword(e.target.value)}/>
                    {
                        !isLogin &&  <input type="password" required placeholder='confirm password'
                        onChange={(e)=>setConfirmPassword(e.target.value)} />
                    }
                    {
                        !isLogin &&  <input type="file" required  placeholder='profile picture' />
                    }
                    
                    <button className='auth_button' onClick={loginSignup}>
                        {isLogin ? "Log In" : "Sign Up"}
                    </button>
            </div>

            <div className='dont_account'>
                    <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                        
                        <span onClick={handleLoginForm}>
                            {` ${isLogin ? "Sign Up" :"Log In"}`}    
                        </span> 
                    </p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login