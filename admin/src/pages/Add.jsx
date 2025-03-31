import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data);

        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setCategory("Men");
        setSubCategory("Topwear");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w[500px] px-3 py-2"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Your product name"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w[500px] px-3 py-2"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Your product description"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Appliances">Appliances</option>
            <option value="Mobile Phones">Mobile Phones</option>
            <option value="Laptop and Desktops">Laptop and Desktops</option>
            <option value="Gaming Console">Gaming Console</option>
            <option value="Toys and Outdoor Sports">
              Toys and Outdoor Sports
            </option>
            <option value="Grocery and Provision">Grocery and Provision</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub-Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Footwear">Footwear</option>
            <option value="Kitchen Appliances">Kitchen Appliances</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Personal Care Appliances">
              Personal Care Appliances
            </option>
            <option value="Electronics">Electronics</option>

            {/* <!-- Mobile Brands --> */}
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Oppo">Oppo</option>
            <option value="Vivo">Vivo</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Asus">Asus</option>
            <option value="Redmi">Redmi</option>
            <option value="Realme">Realme</option>
            <option value="Oneplus">OnePlus</option>

            {/* <!-- Laptops & Desktops --> */}
            <option value="Dell">Dell</option>
            <option value="Lenova">Lenova</option>
            <option value="HP">HP</option>
            <option value="Acer">Acer</option>

            {/* <!-- Gaming -->*/}
            <option value="Playstation Console">PlayStation Console</option>
            <option value="PSP">PSP</option>
            <option value="Steering Wheels">Steering Wheels</option>
            <option value="PlayStation VR">PlayStation VR</option>
            <option value="Gaming CD">Gaming CD</option>
            <option value="Gaming Accessories">Gaming Accessories</option>

            {/* <!-- Toys & Outdoor --> */}
            <option value="Hot Wheels">Hot Wheels</option>
            <option value="Lego">Lego</option>
            <option value="RC Toys">RC Toys</option>
            <option value="Soft Toys">Soft Toys</option>
            <option value="Outdoor Games">Outdoor Games</option>
            <option value="Cycles and Scooters">Cycles and Scooters</option>

            {/* <!-- Grocery --> */}
            <option value="Grains & Pulses">Grains & Pulses</option>
            <option value="Flours & Powders">Flours & Powders</option>
            <option value="Spices & Condiments">Spices & Condiments</option>
            <option value="Oils & Ghee">Oils & Ghee</option>
            <option value="Dairy & Beverages">Dairy & Beverages</option>
            <option value="Snacks & Instant Foods">
              Snacks & Instant Foods
            </option>
            <option value="Personal Care & Household">
              Personal Care & Household
            </option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="1000"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes and Details</p>
        <div className="flex gap-3 flex-wrap">
          {/* for dresses */}
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>

          {/* Mobiles and Electronic */}
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Pro")
                  ? prev.filter((item) => item !== "Pro")
                  : [...prev, "Pro"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Pro") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Pro
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Pro Max")
                  ? prev.filter((item) => item !== "Pro Max")
                  : [...prev, "Pro Max"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Pro Max") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Pro Max
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Slim")
                  ? prev.filter((item) => item !== "Slim")
                  : [...prev, "Slim"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Slim") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Slim
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("500GB")
                  ? prev.filter((item) => item !== "500GB")
                  : [...prev, "500GB"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("500GB") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              500GB
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("1TB")
                  ? prev.filter((item) => item !== "1TB")
                  : [...prev, "1TB"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("1TB") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              1TB
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("1UK")
                  ? prev.filter((item) => item !== "1UK")
                  : [...prev, "1UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("1UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              1UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("2UK")
                  ? prev.filter((item) => item !== "2UK")
                  : [...prev, "2UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("2UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              2UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("3UK")
                  ? prev.filter((item) => item !== "3UK")
                  : [...prev, "3UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("3UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              3UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("4UK")
                  ? prev.filter((item) => item !== "4UK")
                  : [...prev, "4UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("4UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              4UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("5UK")
                  ? prev.filter((item) => item !== "5UK")
                  : [...prev, "5UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("5UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              5UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("6UK")
                  ? prev.filter((item) => item !== "6UK")
                  : [...prev, "6UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("6UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              6UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("7UK")
                  ? prev.filter((item) => item !== "7UK")
                  : [...prev, "7UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("7UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              7UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("8UK")
                  ? prev.filter((item) => item !== "8UK")
                  : [...prev, "8UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("8UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              8UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("9UK")
                  ? prev.filter((item) => item !== "9UK")
                  : [...prev, "9UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("9UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              9UK
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("10UK")
                  ? prev.filter((item) => item !== "10UK")
                  : [...prev, "10UK"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("10UK") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              10UK
            </p>
          </div>

          {/* Editions */}
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("STD Edition")
                  ? prev.filter((item) => item !== "STD Edition")
                  : [...prev, "STD Edition"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("STD Edition") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              STD Edition
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("LMT Edition")
                  ? prev.filter((item) => item !== "LMT Edition")
                  : [...prev, "LMT Edition"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("LMT Edition") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              LMT Edition
            </p>
          </div>

          {/* KG and Gram */}

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("100 G")
                  ? prev.filter((item) => item !== "100 G")
                  : [...prev, "100 G"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("100 G") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              100 G
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("250 G")
                  ? prev.filter((item) => item !== "250 G")
                  : [...prev, "250 G"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("200 G") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              250 G
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("500 G")
                  ? prev.filter((item) => item !== "500 G")
                  : [...prev, "500 G"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("500 G") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              500 G
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("1 KG")
                  ? prev.filter((item) => item !== "1 KG")
                  : [...prev, "1 KG"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("1 KG") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              1 KG
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("500 ML")
                  ? prev.filter((item) => item !== "500 ML")
                  : [...prev, "500 ML"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("500 ML") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              500 ML
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("200 ML")
                  ? prev.filter((item) => item !== "200 ML")
                  : [...prev, "200 ML"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("200 ML") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              200 ML
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("1 Liter")
                  ? prev.filter((item) => item !== "1 Liter")
                  : [...prev, "1 Liter"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("1 Liter") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              1 Liter
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Pack 6")
                  ? prev.filter((item) => item !== "Pack 6")
                  : [...prev, "Pack 6"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Pack 6") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Pack 6
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
        className="w-28 py-3 rounded-md  mt-4 bg-black text-white"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
