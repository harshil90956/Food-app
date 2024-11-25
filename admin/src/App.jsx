import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Add from './Pages/Add/Add';
import {Routes,Route} from 'react-router-dom';
import List from './Pages/List/List';
import Order from './Pages/Orders/Order';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "https://food-app-1myy.onrender.com";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App