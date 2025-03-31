import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct } from '../controller/productController.js'
import upload from '../middlewares/multer.js';
import adminAuth from '../middlewares/adminMiddleware.js';

const productRouter = express.Router()

productRouter.post('/add-product',adminAuth,upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1},{name:'image5', maxCount:1}]),addProduct);
productRouter.delete('/remove-product',adminAuth,removeProduct);
productRouter.get('/single-product',singleProduct);
productRouter.get('/list-products',listProducts);

export default productRouter;