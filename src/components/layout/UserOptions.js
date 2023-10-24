import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSignOutAlt, FaUser, FaShoppingCart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { logout } from "../../App/features/userSlice";
import "./userOption.css";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFABOpen, setFABOpen] = useState(false);

  const handleFABClick = () => {
    setFABOpen(!isFABOpen);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
    handleFABClick();
  };

  const handleProfileClick = () => {
    navigate("/profile");
    handleFABClick();
  };

  const handleOrdersClick = () => {
    navigate("/orders");
    handleFABClick();
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    handleFABClick();

    navigate("/");
  };

  let items = [
    {
      tooltip: "Profile",
      onClick: handleProfileClick,
      icon: <FaUser className="relative" />,
    },
    {
      tooltip: "Orders",
      onClick: handleOrdersClick,
      icon: <FaShoppingCart className="relative" />,
    },
    {
      tooltip: "Logout",
      onClick: handleLogoutClick,
      icon: <FaSignOutAlt className="relative" />,
    },
  ];

  if (user.role === "admin") {
    items.unshift({
      tooltip: "Dashboard",
      onClick: handleDashboardClick,
      icon: <MdDashboard className="relative" />,
    });
  }

  return (
    <>
      <div
        className="relative w-12 h-12 rounded-full cursor-pointer"
        style={{
          backgroundImage: `url(${user.avatar.url})`,
          backgroundSize: "cover",
        }}
        onMouseEnter={handleFABClick}
        onMouseLeave={handleFABClick}
      >
        {isFABOpen && (
          <div className="absolute flex-col items-center py-6 -translate-x-1/2 left-1/2 top-10 ">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 mb-2 transition-all bg-transparent border-2 rounded-full shadow-lg cursor-pointer animate-fall-in backdrop-blur-xl group hover:-translate-y-1 hover:bg-gradient-to-t from-transparent via-transparent to-purple-600"
                onClick={item.onClick}
              >
                {item.icon}
                <span className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 left-[120%] ">
                  {item.tooltip}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserOptions;
