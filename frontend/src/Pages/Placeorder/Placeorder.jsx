import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../context/StoreContext";
import './Placeorder.css';
import axios from "axios";
// import { placOrder } from "../../../../backend/controllers/orderController.js";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Placeorder = () => {


  const {getToatalCartAmount,food_list,cartItems,url,token} = useContext(StoreContext);
   const [data,setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
   })

  //  useEffect(()=>{
  //   console.log(data)
  //  },[data])

  const onChangeHandler = (event)=>{
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }

   const placeOrders = async(event)=>{
     event.preventDefault();
     let orderItems = [];
     console.log(food_list);
     
     food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
     })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getToatalCartAmount()*2,
    }
   let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
   if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url); 
   }
   else{
    alert("Error");
   }

   }
      const navigate = useNavigate();
   useEffect(()=>{
     if (!token) {
      toast.success("Add Item in cart");
      navigate('/cart');
     }
     else if(getToatalCartAmount()===0){
      navigate('/cart');
     }
   },[token])

  return (
    <form className="place-order" onSubmit={placeOrders}>
      <div className="place-order-left">
        <p className="title">
          Delivery Infromation
        </p>
        <div className="multi-fields">
          <input name="firstName" type="text" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" required/>
          <input name="lastName" type="text" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" required/>
        </div>
    
    
      <input name="email" type="text" onChange={onChangeHandler} value={data.email} placeholder="Email Address" required/>
      <input name="street" type="text"onChange={onChangeHandler} value={data.street} placeholder="Street" required/>
      <div className="multi-fields">
          <input name="city" type="text" onChange={onChangeHandler} value={data.city} placeholder="City" required/>
          <input name="state" type="text" onChange={onChangeHandler} value={data.state} placeholder="State" required/>
        </div>

        <div className="multi-fields">
          <input name="zipcode" type="text" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip Code" required/>
          <input name="country" type="text" onChange={onChangeHandler} value={data.country} placeholder="Country" required/>
        </div>
        <input name="phone" type="text" onChange={onChangeHandler} value={data.phone} placeholder="Phone" required/>
        </div>

        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
            <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getToatalCartAmount()}</p>
             </div>
             <hr/>

             <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getToatalCartAmount()===0?0:2}</p>
             </div>
             <hr/>

             <div className="cart-total-details">
              <b>Total</b>
              <b>${getToatalCartAmount()===0?0:getToatalCartAmount()+2}</b>
             </div>
            
        </div>
        <button type="submit">PROCCED TO Payment</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder