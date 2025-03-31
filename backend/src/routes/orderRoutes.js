import express from 'express'
import adminAuth from '../middlewares/adminMiddleware.js'
import { allOrders, placeOrderCOD, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/orderController.js'
import { authUser } from '../middlewares/userMiddleware.js';


const orderRouter = express.Router()

// admin side
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

// payment features 
orderRouter.post('/place',authUser,placeOrderCOD);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

// user side

orderRouter.post('/userorders',authUser,userOrders)

// verify payment

orderRouter.post('/verifyrazorpay',authUser,verifyRazorpay)

export default orderRouter;