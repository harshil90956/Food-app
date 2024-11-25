import express from 'express';



import { placOrder, usersOrders, verifyOrder,listOrders, updateStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userOrders",authMiddleware,usersOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);


export default orderRouter;