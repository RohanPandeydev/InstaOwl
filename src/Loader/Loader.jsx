import React from 'react'
import logo from '../images/logo.png'

const Loader = () => {
    
  return (
   <div className="loader-main">
        <div className="loader-img">
            <img src={logo} alt="" className="img-fluid"/>
        </div>
    </div>
  )
}

export default Loader