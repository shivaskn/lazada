import express from "express";
import cors from "cors";
import "dotenv/config";
import connection from "./config/mongoDBConnection.js";
import connectCloud from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartsRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// App config

const app = express();
const port = process.env.PORT || 8000;
connection();
connectCloud();

// Middlewares

app.use(express.json());
app.use(cors('*'));

// api endpoint

app.use("/auth/user", userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// creating server

app.listen(port, () => {
  console.log("Server started on port:", port);
});
