import dotenv from 'dotenv';
import orderModel from '../models/orderModel.js';
import userModel from '../models/useModel.js';
import Stripe from 'stripe';

// Load environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Ensure this key is correct

const frontend_url = "http://localhost:5174";

const placOrder = async (req, res) => {
    
    console.log(req.body.userId);
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async (req, res) => {
    console.log("req from verify", req.body); // Log the request body
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            console.log("Payment success, updating order:", orderId);
            const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true });

            if (!updatedOrder) {
                console.log("Order not found:", orderId);
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            console.log('Updated Payment Status:', updatedOrder.payment);
            res.json({ success: true, message: "Paid" });
        } else {
            console.log("Payment failed, deleting order:", orderId);
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log("Error in verifyOrder:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
    
};


const usersOrders = async(req, res) => {
    console.log("req from usersOrders", req.body); // Log request body
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        console.log(orders);  
        res.json({ success: true, data:orders });
    } catch (error) {
        console.error('Error in usersOrders:', error); // Detailed error log
        res.status(500).json({ success: false, message: "Error" });
    }
}


// listing order for admin panel

const listOrders = async(req,res)=>{
    try {
        const order = await orderModel.find({});
        res.json({success:true,data:order});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// api for updating order status

const updateStatus = async(req,res)=>{
   try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
   }
}


export { placOrder,verifyOrder,usersOrders,listOrders,updateStatus};
