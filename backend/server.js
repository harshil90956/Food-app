import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import authMiddleware from "./middleware/auth.js";
import orderRouter from "./routes/orderRoute.js";
import session, { Cookie, Session } from "express-session";


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*', // Allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
const sessionOptions = {
    secret:"mysecraetforsession",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() * 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly:true,
    }
}

app.use(session(sessionOptions))

app.get("/get",(req,res)=>{
    res.send("ok done");
})
// Connect to the database
connectDB();

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", authMiddleware, cartRouter);
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(port, () => {
    console.log(`Server started`);
});
