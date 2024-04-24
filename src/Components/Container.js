import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'
import { initializeApp } from "firebase/app";
import { getDatabase, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC9mDmMqw1Le6AGw46x40Cn59o5b4emN1k",
  authDomain: "authentication-app-bd5a7.firebaseapp.com",
  databaseURL: "https://authentication-app-bd5a7-default-rtdb.firebaseio.com",
  projectId: "authentication-app-bd5a7",
  storageBucket: "authentication-app-bd5a7.appspot.com",
  messagingSenderId: "954323413512",
  appId: "1:954323413512:web:ba7445612a7767d4597fbd"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app)

export default function Container() {
  const [state, setState] = useState({
    page : 1,
    message : "",
    type : 1
  })
  const pageSwitchHandler = (e) => {
    setState({
      page : !state.page
    })
    e.preventDefault()
  }
  const registrationHandler = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const confirmPassword = e.target.confirmPassword.value
    if (password !== confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        message : "Password does not match. Please check your Password and Try Again",
        type : 0
      }))
      return
    }
    createUserWithEmailAndPassword(auth, email, password).then((data) => {
      sendEmailVerification(auth.currentUser)
      setState((prevState) => ({
        ...prevState,
        message : "Registration Successful. Verification Email has been sent to your registered Email",
        type : 1
      }))
      e.target.email.value = "";
      e.target.password.value = "";
      e.target.confirmPassword.value = "";
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        message : error.message,
        type : 0
      }))
    })
  }
  const loginHandler = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    signInWithEmailAndPassword(auth, email, password).then((data) => {
      if (data.user.emailVerified === true) {
        setState((prevState) => ({
          ...prevState,
          message : "Login Successfull",
          type : 1
        }))
      }
      else {
        setState((prevState) => ({
          ...prevState,
          message : "Your Email is not verified yet!",
          type : 0
        }))
      }
      e.target.email.value = "";
      e.target.password.value = "";
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        message : error.message,
        type : 0
      }))
    })
  }
  const googleRegistrationHandler = () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((response) => {
      setState((prevState) => ({
        ...prevState,
        message : "Registration Successful",
        type : 1
      }))
    })
  }
  const googleLoginHandler = () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider)
  }
  return (
    <>
     {state.page ? <Register switch={pageSwitchHandler} registerUser={registrationHandler} google={googleRegistrationHandler} message={state.message} type={state.type}/> : <Login switch={pageSwitchHandler} loginUser={loginHandler} google={googleLoginHandler} message={state.message} type={state.type}/>} 
    </>
  )
}
