import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const Navbar = ({setShowLoging}) => {
    const [menu , setMenu] = useState("menu");
    
    const {getToatalCartAmount,token,setToken} = useContext(StoreContext);
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.success("Logged out successfully");
    }




    return (
        <div className='navbar'>
          <Link to='/'> <img className="logo" src={assets.logo} alt="logo"/></Link> 
            <ul className="navbar-menu">
                <Link to='/' onClick={()=>setMenu("home")} className={menu === "home"?"active":""}>Home</Link>
                <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu === "menu"?"active":""}>Menu</a>
                <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app"?"active":""}>Mobile-app</a>
                <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu === "contact-us"?"active":""}>Contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search"/>
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="basket"/></Link>
                    <div className={getToatalCartAmount()===0?"":"dot"}></div>
                </div>
                {
                    !token?<button onClick={()=>setShowLoging(true)}>Sign in</button>:
                    <div className='navbar-profile'>
                    <img src={assets.profile_icon}/>
                    <ul className="nav-profile-dropdown">
                        <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon}/><p>Orders</p></li>
                        <hr/>
                        <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
                    </ul>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Navbar;
