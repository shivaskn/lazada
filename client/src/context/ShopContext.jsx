import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products,setProduct] = useState([]);
  const [token,setToken] = useState('')
  const navigate = useNavigate()

  const addToCart = async (itemId, sizes) => {
    if (!sizes) {
      toast.warn("Please Select Product Variant");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][sizes]) {
        cartData[itemId][sizes] += 1;
      } else {
        cartData[itemId][sizes] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][sizes] = 1;
    }
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/add',{itemId,sizes}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, sizes, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][sizes] = quantity;
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update',{itemId, sizes, quantity},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
            console.log(error)
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async ()=> {
     try {
      const response = await axios.get(backendUrl + `/api/product/list-products`)
      if(response.data.success){
        setProduct(response.data.products)
      }else{
        toast.error(response.data.message)
      }
     } catch (error) {
      console.log(error)
      toast.error(error.message)
     }
  }

  const getUserCart = async (token)=> {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get',{},{headers: {
        Authorization: `Bearer ${token}`,
      }},)

      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getProductData()
  },[])

  useEffect(()=>{
    if(!token && localStorage.getItem('userToken')){
      setToken(localStorage.getItem('userToken'))
      getUserCart(localStorage.getItem('userToken'))
    }
  },[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    cartItems,
    setCartItems,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,setToken
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
