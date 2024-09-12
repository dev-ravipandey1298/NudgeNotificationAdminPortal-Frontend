import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'


function Layout() {

  const location = useLocation();
  const navigate = useNavigate();
  const [showData, setShowData] = useState(true);

  useEffect(() => {
    if (location.pathname.includes("health")) {
      setShowData(false)
      navigate("/health")
    }
  }, [])
  

  return (
    <>
        {showData && <Header/>}
        <Outlet/>
    </>
  )
}

export default Layout