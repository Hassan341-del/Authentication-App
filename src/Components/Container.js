import React, { useState } from 'react'
import Home from './Home'
import AboutUs from './AboutUs'
import Services from './Services'
import ContactUs from './ContactUs'
import Register from './Register'
import Login from './Login'
import Header from './Header'
import Footer from './Footer'
import Page404 from './Page404'
import { initializeApp } from "firebase/app";
import { get, getDatabase, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, browserSessionPersistence, setPersistence} from 'firebase/auth'
import {Routes, Route, useNavigate} from 'react-router-dom'
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
  const navigate = useNavigate();
  const [state, setState] = useState({
    message : "",
    type : 1
  })
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
    createUserWithEmailAndPassword(auth, email, password)
    .then((data) => {
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
      e.target.reset()

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
          // message : "Login Successfull",
          // type : 1
        }))
        navigate("/")
      }
      else {
        setState((prevState) => ({
          ...prevState,
          message : "Your Email is not verified yet! Please Check your mail box",
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
    .then((result) => {
      setState((prevState) => ({
        ...prevState,
        // message : "Login Succesful",
        // type : 1
      }))
      navigate("/")
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  const googleLoginHandler = () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // alert("Login Successful")
      console.log(result)
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  const faceookRegistrationHandler = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth()
    signInWithPopup(auth, provider)
    .then((result) => {
      setState((prevState) => ({
        ...prevState,
        // message : "Login Succesful",
        // type : 1
      }))
      console.log(result)
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  const facebookLoginHandler = () => {
    const provider = new FacebookAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
    .then((result) => {
      // alert("Login Succesful")
      console.log(result)
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  const handleSignOut = () => {
    const auth = getAuth()
    signOut(auth)
    .then(() => {
      console.log("Sign Out Successfull")
      navigate("/signin")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <>
    <Header signOut={handleSignOut}/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path='/signup' element={ <Register registerUser={registrationHandler} googleRegistration={googleRegistrationHandler} facebookRegistration={faceookRegistrationHandler} message={state.message} type={state.type} /> } />
       <Route path='/signin' element={ <Login loginUser={loginHandler} googleLogin={googleLoginHandler} facebookLogin={facebookLoginHandler} message={state.message} type={state.type} /> } />
       <Route path='*' element={ <Page404 /> }/>
      </Routes>
    <Footer />
    </>
  )
}