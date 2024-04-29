import React from 'react'
import Lottie from 'lottie-react'
import Animation from './404.json'
import './Page404.css'
export default function Page404() {
  return (
    <>
    <div className='lottie-parent'>
    <Lottie animationData={Animation} loop={true} autoPlay={true} className='lottie'/>
    </div>
    </>
  )
}
