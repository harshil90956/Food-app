import User from "../models/useModel.js";

const addToCart = async (req, res) => {
    try {
        // Find user by ID
        let userData = await User.findById({_id:req.body.userId});
        console.log(userData);
        
        console.log(userData)
        // If user not found, return error
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not present
        let cartData = userData.cartData || {};

        // Add or update item quantity in cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update user's cartData in the database
        await User.findByIdAndUpdate(req.body.userId, { cartData });

        // Send success response
        res.status(200).json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        // Send error response
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
}
// remove items from user carts

const removeFromCart = async (req, res) => {
    try {
        // Find user by ID
        let userData = await User.findById(req.body.userId);

        // If user not found, return error
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not present
        let cartData = userData.cartData || {};

        // Check if the item exists in the cart
        if (!cartData[req.body.itemId] || cartData[req.body.itemId] <= 0) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Decrement item quantity in cart
        cartData[req.body.itemId] -= 1;

        // If quantity reaches zero, remove the item from the cart
        if (cartData[req.body.itemId] <= 0) {
            delete cartData[req.body.itemId];
        }

        // Update user's cartData in the database
        await User.findByIdAndUpdate(req.body.userId, { cartData });

        // Send success response
        res.status(200).json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error(error);
        // Send error response
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
}
// fetch user cart data

const getCart = async (req, res) => {
    try {
        const userId = req.body.userId; // Get userId from the middleware
        console.log("User ID from token:", userId); // Log the userId

        const userData = await User.findById(userId); // Fetch user data by userId
        console.log("User data retrieved:", userData); // Log the retrieved user data

        if (!userData) {
            console.log("User not found for ID:", userId); // Log if user is not found
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData; // Assuming cartData is a field in the user model
        console.log("Cart data:", cartData); // Log the cart data

        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart data:", error); // Log any errors that occur
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};


export {addToCart,removeFromCart,getCart};