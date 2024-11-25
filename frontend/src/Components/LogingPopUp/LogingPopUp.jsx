import React, { useContext, useState } from 'react';
import './LogingPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LogingPopUp = ({ setShowLoging }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { url, setToken } = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const val = event.target.value;
    setData(prevData => ({ ...prevData, [name]: val }));
  };

  const onLoging = async (e) => {
    e.preventDefault();

    let newUrl = `${url}/api/user`;
    newUrl += currState === "Loging" ? "/login" : "/register";

    try {
      console.log(newUrl);
      
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        const token = response.data.accessToken;
        console.log(response.data.accessToken)
        console.log(token);
        
        setToken(token);
        localStorage.setItem("token", token);
        setShowLoging(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className='loging-popup'>
      <form className="loging-popup-container" onSubmit={onLoging}>
        <div className="loging-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLoging(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="loging-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder='Your Username'
              onChange={onChangeHandler}
              value={data.username}
              name='username'
              required
            />
          )}
          <input
            type="email"
            placeholder='Your Email'
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="loging-popup-condition">
          <input type='checkbox' required />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Loging" ?
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p> :
          <p>Already have an account? <span onClick={() => setCurrState("Loging")}>Login here</span></p>}
      </form>
    </div>
  );
};

export default LogingPopUp;
