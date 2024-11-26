import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFood_list] = useState([]);
    
    const url = "https://food-app-1myy.onrender.com";

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { withCredentials: true },{ headers: { token } });
        }
    }

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId },{ withCredentials: true }, { headers: { token } });
        }
    }

    // Calculate total cart amount
    const getToatalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(product => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // Fetch food list
    const fethFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`,{ withCredentials: true });
        setFood_list(response.data.data);
    }

    // Load cart data
    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {},{ withCredentials: true }, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fethFoodList();

            // Get token from localStorage
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list, cartItems, setCartItems, addToCart, removeFromCart, getToatalCartAmount, url, token, setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
