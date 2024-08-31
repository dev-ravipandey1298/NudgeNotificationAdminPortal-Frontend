import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    
const navigate = useNavigate();

useEffect(() => {
    const userLoggedIn = JSON.parse(sessionStorage.getItem("user"))
    userLoggedIn !== null ? userLoggedIn.role === "CHECKER" ? navigate("/checker") : navigate("/maker") :  navigate("/login")
  }, [])

  return (
    <>
        <Navbar/>
    </>
  )
}

export default Header