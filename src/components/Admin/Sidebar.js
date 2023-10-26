import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaPlus,
  FaCubes,
  FaUsers,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

const Sidebar = ({ handleSectionChange, activeSection }) => {
  return (
    <div className="flex flex-col md:h-screen h-auto p-4 shadow-lg ">
      <p className="text-4xl pb-5 ">logo</p>
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
