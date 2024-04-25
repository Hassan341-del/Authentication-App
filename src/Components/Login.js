import React, { useState } from 'react';
import './Login.css';

export default function Login(props) {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const handlePassordInput = (e) => {
        setPassword(e.target.value)
    }
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    let errorMessageClass = ["text-center", "error-message"]
    if(props.type) {
        errorMessageClass.push("text-success")
    }
    else {
        errorMessageClass.push("text-danger")
    }
  return (
    <>
      <div className="parent">
        <div className="child">
          <form action="" onSubmit={props.loginUser}>
            <h3 className='text-center login'>Login</h3>
            <p className={errorMessageClass.join(" ")}>{props.message}</p>
            <label htmlFor="email" className="form-label">Email</label>
            <input type='email' className="form-control" id="email" placeholder="Email" name='email'/>
            <label htmlFor="password" className="form-label">Password</label>
            {
                password !== "" && (
                    <i className={`fa-regular fa-eye${showPassword === true ? "-slash" : ""} show-password`} onClick={togglePassword}></i>
                )
            }
            <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" placeholder="Password" value={password} name='password' onChange={handlePassordInput}/>
            <div className="controls">
              <div className="forgot-password">
                <a href='#' onClick={props.forgotPassword}>Forgot Password</a>
              </div>
              <div className="sign-up">
                <a href='#' onClick={props.switch}>Sign Up</a>
              </div>
            </div>
            <button className='btn btn-primary login-btn'>Login</button>
          </form>
          <div className="social">
            <div className="google">
                <button className='btn'> <i className='fab fa-google'></i> Google </button>
            </div>
            <div className="apple">
                <button className='btn'> <i className='fab fa-apple'></i> Apple</button>
            </div>
            <div className="facebook">
                <button className='btn'> <i className='fab fa-facebook'></i> Faceook </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
