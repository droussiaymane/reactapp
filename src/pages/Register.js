import React, { useEffect } from 'react';
import FormRegister from '../components/FormRegister'
import Nav from '../components/Nav'
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  let islogged=authService.islogged();
  
  useEffect(()=>{
if(islogged){
  navigate("/home")
}
},[])
  return (
    <>
    <Nav/>
    <FormRegister/>
    </>
  )
}

export default Register