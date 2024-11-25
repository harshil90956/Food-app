import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import LogingPopUp from './Components/LogingPopUp/LogingPopUp';
import Placeorder from './Pages/Placeorder/Placeorder';
import Verify from './Pages/verify/Verify';
import Myorders from './Pages/Myorders/Myorders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLoging, setShowLoging] = useState(false);

  return (
    <>
      {showLoging && <LogingPopUp setShowLoging={setShowLoging} />}
      <div className='app'>
        <ToastContainer />
        <Navbar setShowLoging={setShowLoging} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<Myorders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
