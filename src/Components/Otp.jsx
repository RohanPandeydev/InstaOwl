import React, { useState } from 'react'
import logo from '../images/logo.png'
import background from '../images/login-bg.jpg'
import { Link } from 'react-router-dom'
import OtpInput from 'react-otp-input';

const Otp = (props) => {

  const { setValue, value, submitOtp } = props;


  return (
    <div className='login-section' style={{ backgroundImage: `url(${background})` }}>
      <div className='login-container'>
        <div className="login-logo">
          <img src={logo} alt="" className="img-fluid" />
        </div>
        <form className='login-form'>
          <div className='login-form-head'>
            <h3>Verify with OTP</h3>
            <p>Enter the 4- digit code send to:</p>
            {/* <span>+91 </span> */}
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className='otp-container'>
                <OtpInput
                  containerStyle={true}
                  value={value}
                  onChange={setValue}
                  numInputs={4}
                  inputStyle={true}
                  isInputNum={true}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className='login-btn'>
                <button type="submit" className='btn' onClick={submitOtp}>Verify OTP</button>
              </div>
            </div>
          </div>
          {/* <div className='login-form-footer'>
            <p>Fetching OTP in <span>58</span> sec</p>
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default Otp