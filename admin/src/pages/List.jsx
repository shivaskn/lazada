import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list-products"
      );
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProducts = async (id) => {
    try {
      const response = await axios.delete(
        backendUrl + `/api/product/remove-product?id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
       <div className="p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h3>

      {list.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 border-b text-gray-700 text-sm font-semibold">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {list.map((item, index) => (
                <tr key={index} className="border-b text-gray-700 text-sm hover:bg-gray-50">
                  <td className="p-3">
                    <img className="w-14 h-14 object-cover rounded-md" src={item.images[0]} alt={item.name} />
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 font-semibold">{currency} {item.price}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => removeProducts(item._id)}
                      className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6 text-lg">No products available</p>
      )}
    </div>
  );
};

export default List;
