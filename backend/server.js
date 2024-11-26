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
const allowedOrigins = [
    "https://food-app-1-92yc.onrender.com", 
    "https://frontend-8jj4.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Origin is allowed
        } else {
            console.error(`CORS blocked for origin: ${origin}`);
            callback(new Error("Not allowed by CORS")); // Origin not allowed
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies or sessions
}));

const sessionOptions = {
    secret: "mysecraetforsession",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // Expires in 3 days
        maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days in milliseconds
        httpOnly: true, // Accessible only by web servers
        secure: true, // Only send cookies over HTTPS
        sameSite: "none", // Required for cross-origin cookies
    },
};

// Use the session middleware
app.use(session(sessionOptions));

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
