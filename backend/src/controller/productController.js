import { v2 as cloudinary } from "cloudinary";
import productModel from "../model/productModel.js";

// function to add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      images: imageUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function to list product

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      success:true,
      products
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function to removing product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.query.id)
    res.json({
      success:true,
      message:'Product Removed Successfully'
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function for single product info

const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({
      success:true,
      product
    })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };

// Promise.all([...]) ensures that all the images are uploaded asynchronously in parallel.

// images.map(async (item) => {...}):

// Loops through each image file.

// Uploads the file to Cloudinary using cloudinary.uploader.upload().

// item.path: This is the file path where the image is stored temporarily (usually handled by multer).

// { resource_type: 'image' }: Specifies that the uploaded file is an image.

// result.secure_url: The publicly accessible URL of the uploaded image.

// await Promise.all([...]):

// Ensures that all uploads finish before moving forward.

// imageUrl will be an array of URLs, each corresponding to an uploaded image.
