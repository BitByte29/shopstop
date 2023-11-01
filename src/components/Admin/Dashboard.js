import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./adminStyle.css";
import UserOptions from "../layout/UserOptions";
import { useSelector } from "react-redux";
import Stats from "./Stats";
import Users from "./Users";
import Orders from "./Orders";
import Reviews from "./Reviews";
import Products from "./Products";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Stats");
  const { user } = useSelector((s) => s.users);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin" && user.role !== "visitor") {
      toast("Admins only");
      navigate("/profile");
    }
    // eslint-disable-next-line
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {user && (user.role === "admin" || user.role === "visitor") ? (
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
              {activeSection === "Reviews" && <Reviews role={user.role} />}
              {activeSection === "AddProduct" && (
                <AddProduct role={user.role} />
              )}
              {activeSection === "Stats" && (
                <Stats setActiveSection={setActiveSection} />
              )}
              {activeSection === "Orders" && <Orders role={user.role} />}
              {activeSection === "Products" && <Products role={user.role} />}
              {activeSection === "Users" && <Users role={user.role} />}
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
