import './Header.css';
import React from 'react';

const Header = () => {
  return (
    <div className='header'>
        <img src="/header_img.png" alt="Header" className="header-image" />
        <div className="header-content">
            <h2>Order Your Favourite Food Here</h2>
            <p>Choose from a wide variety of dishes made with the finest ingredients and culinary expertise. Our goal is to provide you with an exceptional dining experience, no matter what you’re craving!</p>
            <button>View Menu</button>
        </div>
    </div>
  );
}

export default Header;
