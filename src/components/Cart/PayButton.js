import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PayButton = ({ cartItems }) => {
  const { user } = useSelector((s) => s.users);
  const { apiKey } = useSelector((s) => s.vars);
  const [clicked, setClicked] = useState(false);

  const calculateTotalPrice = (price, discount) => {
    let discountAmount = (discount * price) / 100;
    let salePrice = price - discountAmount;
    return salePrice + (18 / 100) * salePrice;
  };

  const updatedProducts = cartItems.map((product) => ({
    ...product,
    price: Math.round(calculateTotalPrice(product.price, product.discount)),
  }));
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      toast.warning("Check your Internet connection.");
      setClicked(false);
      navigate("/confirmorder");
    }, 10000);
    axios
      .post("http://localhost:3001/api/v1/create-checkout-session", {
        updatedProducts,
      })
      .then((res) => {
        if (res.data.redirectUrl) {
          console.log(res.data.paymentIntentId);
          window.location.href = res.data.redirectUrl;
        } else {
          console.log(res.data);
          //   alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        console.log("Hi");
        toast(err);
      });
  };
  return (
    <>
      <button
        className={`${
          clicked ? "bg-cyan-600 cursor-wait" : ""
        } bg-cyan-400 font-semibold flex-center w-28 h-12 hover:-translate-y-2 transition-all`}
        onClick={handleClick}
      >
        {!clicked ? (
          <span> Pay now.</span>
        ) : (
          <div className="text-transparent h-5 w-5 border-white border-4  border-b-cyan-400 rounded-full animate-spin">
            {" "}
            o
          </div>
        )}
      </button>
    </>
  );
};

export default PayButton;
