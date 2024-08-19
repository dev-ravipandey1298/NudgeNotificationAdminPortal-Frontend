import React from 'react'
import Navbar from './Navbar'
import Checker from './Checker'
import Maker from './Maker'

const Home = ({userDetails}) => {
  return (
    <div>
      <Navbar userDetails={userDetails}/>
      {
        userDetails.role === "CHECKER" ? <Checker userDetails={userDetails}/> : <Maker userDetails={userDetails}/>
      }
    </div>
  )
}

export default Home
