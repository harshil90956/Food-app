import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';


const FoodDisplay = ({category}) => {

   const {food_list} = useContext(StoreContext);

//    useEffect(()=>{
//     console.log(food_list.map((item,index)=>{
//         console.log(item.image);
//     }))
//    },[])

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {
                food_list.map((item,index)=>{
                    if (category==="All" || category===item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price}/>
                    }
                    
                   })
            }
        </div>
    </div>
  )
}

export default FoodDisplay