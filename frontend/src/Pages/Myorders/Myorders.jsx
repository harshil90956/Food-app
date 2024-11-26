import React, { useContext, useEffect, useState } from 'react';
import './Myorders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets.js';


const Myorders = () => {
   const { url, token } = useContext(StoreContext);
   const [data, setData] = useState([]);

   const fetchOrders = async () => {
      try {
         const response = await axios.post(url + "/api/order/userOrders", {},{ withCredentials: true }, { headers: { token } });

         // Log the full response to see its structure
         console.log('Full Response:', response);

         // Set data and log the specific field
         setData(response.data.data);
         console.log('Orders Data:', response.data.data);
      } catch (error) {
         console.error('Error fetching orders:', error);
      }
   };

   useEffect(() => {
      if (token) {
         fetchOrders();
      }
   }, [token]);

   return (
      <div className='my-orders'>
         <h2>My Orders</h2>
         <div className="container">
            {data.map((order, index) => (
               <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="Parcel Icon" />
                  <p>
                     {order.items.map((item, index) => (
                        <span key={index}>{item.name} x {item.quantity}{index < order.items.length - 1 ? ', ' : ''}</span>
                     ))}
                  </p>
                  <p>${order.amount}.00</p>
                  <p>Items {order.items.length}</p>
                  <p><span>&#x25cf;&nbsp;</span><b>{order.status}</b></p>
                  <button onClick={fetchOrders}>Track Order</button>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Myorders;
