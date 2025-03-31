import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.order.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event,orderId)=> {
    try {
      const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:event.target.value},   {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if(response.data.success){
        await fetchAllOrders()
        toast.success(response.data.message)

      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Page</h3>

    <div>
      {orders.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-300 p-5 rounded-lg shadow-md bg-white my-4"
        >
          {/* Order Icon */}
          <img
            src={assets.parcel_icon}
            alt="Parcel"
            className="w-12 h-12 sm:w-14 sm:h-14 mx-auto"
          />

          {/* Order Details */}
          <div className="text-gray-700 text-sm space-y-2">
            <div>
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} x {item.quantity} <span>{item.sizes}</span>
                </p>
              ))}
            </div>
            <p className="font-medium text-gray-900">
              {order.address.firstName} {order.address.lastName}
            </p>
            <div className="text-gray-600">
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>
            </div>
            <p className="font-medium text-gray-900">{order.address.phone}</p>
          </div>

          {/* Payment & Order Info */}
          <div className="text-gray-700 text-sm space-y-2">
            <p>Items: <span className="font-semibold">{order.items.length}</span></p>
            <p>Method: <span className="font-semibold">{order.paymentMethod}</span></p>
            <p>
              Payment:{" "}
              <span className={order.payment ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                {order.payment ? "Done" : "Pending"}
              </span>
            </p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>

          {/* Total Amount */}
          <p className="font-bold text-lg text-gray-900">
            {currency} {order.amount}
          </p>

          {/* Order Status Update */}
          <div className="flex flex-col space-y-2">
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="border cursor-pointer border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Orders;
