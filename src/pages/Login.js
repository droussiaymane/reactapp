import React, { useEffect } from 'react'
import FormLogin from '../components/FormLogin'
import Nav from '../components/Nav';
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';


const Login = () => {
  const navigate = useNavigate();
  let islogged=authService.islogged();
  
  useEffect(()=>{
if(islogged){
  navigate("/home")
}
},[])
  return (
    <>
    <Nav></Nav>
        <FormLogin></FormLogin>

    </>
  )
}

export default Login