import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filter, setFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavant");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
     
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subcategory.includes(item.subcategory)
      );
    }

    setFilterProduct(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProduct.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setFilter(!filter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS{" "}
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${filter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Appliances"}
                onChange={toggleCategory}
              />
              Appliances
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Mobile Phones"}
                onChange={toggleCategory}
              />
              Mobile Phones
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Laptop and Desktops"}
                onChange={toggleCategory}
              />
              Laptop and Desktops
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Gaming Console"}
                onChange={toggleCategory}
              />
              Gaming Console
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Toys and Outdoor Sports"}
                onChange={toggleCategory}
              />
              Toys and Outdoor Sports
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Grocery and Provision"}
                onChange={toggleCategory}
              />
              Grocery and Provision
            </p>
          </div>
        </div>
        {/* Lifestyle subcategory menu */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">LIFESTYLE VARIANT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Footwear"}
                onChange={toggleSubCategory}
              />
              Footwear
            </p>
          </div>
        </div>
        {/* Appliance SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">APPLIANCE VARIANT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kitchen Appliances"}
                onChange={toggleSubCategory}
              />
              Kitchen Appliances
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Home Appliances"}
                onChange={toggleSubCategory}
              />
              Home Appliances
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Personal Care Appliances"}
                onChange={toggleSubCategory}
              />
              Personal Care Appliances
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Electronics"}
                onChange={toggleSubCategory}
              />
              Electronics
            </p>
          </div>
        </div>
        {/* Mobile SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">MOBILE VARIANT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Apple"}
                onChange={toggleSubCategory}
              />
              Apple
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Samsung"}
                onChange={toggleSubCategory}
              />
              Samsung
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Oppo"}
                onChange={toggleSubCategory}
              />
              Oppo
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Vivo"}
                onChange={toggleSubCategory}
              />
              Vivo
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Xiaomi"}
                onChange={toggleSubCategory}
              />
              Xiaomi
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Asus"}
                onChange={toggleSubCategory}
              />
              Asus
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Redmi"}
                onChange={toggleSubCategory}
              />
              Redmi
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Realme"}
                onChange={toggleSubCategory}
              />
              Realme
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Oneplus"}
                onChange={toggleSubCategory}
              />
              Oneplus
            </p>
          </div>
        </div>
        {/* Laptop SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">LAPTOP & DESKTOP VARIANT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Dell"}
                onChange={toggleSubCategory}
              />
              Dell
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Apple"}
                onChange={toggleSubCategory}
              />
              Apple
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Samsung"}
                onChange={toggleSubCategory}
              />
              Samsung
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Asus"}
                onChange={toggleSubCategory}
              />
              Asus
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Lenova"}
                onChange={toggleSubCategory}
              />
              Lenova
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"HP"}
                onChange={toggleSubCategory}
              />
              HP
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Acer"}
                onChange={toggleSubCategory}
              />
              Acer
            </p>
          </div>
        </div>
        {/* Gaming SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">GAMING & ACCESS VARIANT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Playstation Console"}
                onChange={toggleSubCategory}
              />
              Playstation Console
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"PSP"}
                onChange={toggleSubCategory}
              />
              PSP
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Steering Wheels"}
                onChange={toggleSubCategory}
              />
              Steering Wheels
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Playstation VR"}
                onChange={toggleSubCategory}
              />
              Playstation VR
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Gaming CD"}
                onChange={toggleSubCategory}
              />
              Gaming CD
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={" Accessories"}
                onChange={toggleSubCategory}
              />
              Accessories
            </p>
          </div>
        </div>
        {/* Toys SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TOYS & OUTDOOR VARIANT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Hot Wheels"}
                onChange={toggleSubCategory}
              />
              Hot Wheels
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Lego"}
                onChange={toggleSubCategory}
              />
              Lego
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"RC Toys"}
                onChange={toggleSubCategory}
              />
              RC Toys
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Soft Toys"}
                onChange={toggleSubCategory}
              />
              Soft Toys
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Outdoor Games"}
                onChange={toggleSubCategory}
              />
              Outdoor Games
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Cycles and scoote"}
                onChange={toggleSubCategory}
              />
              Cycles and scooter
            </p>
          </div>
        </div>
        {/* Provision SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">GROCERY & PRO VARIANT</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Grains & Pulses"}
                onChange={toggleSubCategory}
              />
              Grains & Pulses
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Flours & Powders"}
                onChange={toggleSubCategory}
              />
              Flours & Powders
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Spices & Condiments"}
                onChange={toggleSubCategory}
              />
              Spices & Condiments
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Oils & Ghee"}
                onChange={toggleSubCategory}
              />
              Oils & Ghee
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Dairy & Beverages"}
                onChange={toggleSubCategory}
              />
              Dairy & Beverages
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Snacks & Instant Foods"}
                onChange={toggleSubCategory}
              />
              Snacks & Instant Foods
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Personal Care & Household"}
                onChange={toggleSubCategory}
              />
              Personal Care & Household
            </p>
          </div>
        </div>
      </div>
      {/* right side UI */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} id="product-list" />
          {/* PRODUCT SORT */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct
            .slice((currentPage - 1) * 20, currentPage * 20)
            .map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                images={item.images}
              />
            ))}
        </div>
        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#product-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
                src={assets.left_arrow}
              />
            </a>
            {Array.from({ length: Math.ceil(products.length / 20) }).map(
              (_, index) => (
                <a href="#product-list" key={index}>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded cursor-pointer  ${
                      currentPage === index + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#product-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(products.length / 20))
                  )
                }
                src={assets.righy_arrow}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
