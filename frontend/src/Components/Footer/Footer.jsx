import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
     <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eius, aliquam vero doloremque minima quo fugiat amet eum impedit non laudantium quae maiores. Dicta at sint alias, vel placeat aut.</p>
           <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
           </div>
        </div>
        <div className="footer-content-center">
            <h2>Comapany</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivry</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get in touch</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
     </div>
     <hr/>
     <p className="footer-copyright">
     Copyright 2024 © Dobariya Harshil - All rights reserved.
     </p>
    </div>
  )
}

export default Footer