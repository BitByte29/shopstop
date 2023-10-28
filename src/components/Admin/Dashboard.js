import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./adminStyle.css";
import UserOptions from "../layout/UserOptions";
import { useDispatch, useSelector } from "react-redux";
import Stats from "./Stats";
import Users from "./Users";
import Orders from "./Orders";
import Reviews from "./Reviews";
import Products from "./Products";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((s) => s.users);

  const [activeSection, setActiveSection] = useState("AddProduct");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      toast("Admins only");
      navigate("/profile");
    }
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {user && user.role === "admin" ? (
        <div className="overflow-hidden ">
          <div className="fixed top-5 right-4 md:right-24 z-50 ">
            <UserOptions user={user} />
          </div>
          <div className="absolute top-0 left-0 flex flex-col  md:flex-row w-screen z-40 bg-red-200 admin max-w-[100%]">
            <div className="relative w-full md:w-1/6">
              <div className=" sticky top-0">
                <Sidebar
                  handleSectionChange={handleSectionChange}
                  activeSection={activeSection}
                />
              </div>
            </div>
            <div className="w-full md:w-5/6 sm:px-8 px-2 min-h-screen">
              {activeSection === "Reviews" && <Reviews />}
              {activeSection === "AddProduct" && <AddProduct />}
              {activeSection === "Stats" && (
                <Stats setActiveSection={setActiveSection} />
              )}
              {activeSection === "Orders" && <Orders />}
              {activeSection === "Products" && <Products />}
              {activeSection === "Users" && <Users />}
            </div>
          </div>
        </div>
      ) : (
        <p>Only Admins Allowed</p>
      )}
    </>
  );
};

export default Dashboard;
