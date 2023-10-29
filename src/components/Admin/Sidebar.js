import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaPlus,
  FaCubes,
  FaUsers,
  FaShoppingCart,
  FaStar,
  FaArrowLeft,
} from "react-icons/fa";

const Sidebar = ({ handleSectionChange, activeSection }) => {
  return (
    <div className="flex flex-col md:h-screen h-auto p-4 shadow-lg bg-yellow-200/70">
      <Link to="/" className="py-2 px-4 text-lg md:text-3xl flex items-center">
        <FaArrowLeft />
        <img
          src="/adminss.png"
          alt="admin"
          className="rounded-full w-12 h-12"
        />
      </Link>
      <div className="flex flex-col gap-2 side-links ">
        <button
          className={`sidebar-nav 
          ${activeSection === "Stats" ? "activeSection" : ""}`}
          onClick={() => handleSectionChange("Stats")}
        >
          <FaChartBar /> Statistics
        </button>
        <button
          className={`sidebar-nav 
          ${activeSection === "AddProduct" ? "activeSection" : ""}`}
          onClick={() => handleSectionChange("AddProduct")}
        >
          <FaPlus /> Create Product
        </button>
        <button
          className={`sidebar-nav 
          ${activeSection === "Products" ? "activeSection" : ""}`}
          onClick={() => handleSectionChange("Products")}
        >
          <FaCubes />
          Products
        </button>
        <button
          className={`sidebar-nav 
          ${activeSection === "Users" ? "activeSection" : ""}`}
          onClick={() => handleSectionChange("Users")}
        >
          <FaUsers /> Users
        </button>
        <button
          className={`sidebar-nav 
          ${activeSection === "Orders" ? "activeSection" : ""}`}
          onClick={() => handleSectionChange("Orders")}
        >
          <FaShoppingCart /> Orders
        </button>
        <button
          className={`sidebar-nav 
          ${activeSection === "Reviews" ? "activeSection" : ""}`}
          onClick={() => handleSectionChange("Reviews")}
        >
          <FaStar /> Reviews
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
