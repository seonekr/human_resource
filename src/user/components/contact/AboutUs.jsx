import React from 'react'
import './aboutUs.css'
import bg from './bg.jpg'

const AboutUs = () => {
  return (
    <div className='about-us'
    style={{backgroundImage: `url(${bg})`}}
    >
        <div className='box-1'>
            <div className="pic"></div>
            <div className="text-area"></div>
        </div>
    </div>
  )
}

export default AboutUs