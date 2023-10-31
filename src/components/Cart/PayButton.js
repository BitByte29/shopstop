import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getserver } from "../../App/features/host";

const PayButton = ({ cartItems }) => {
  const [clicked, setClicked] = useState(false);
  const server = getserver();
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
    }, 15000);
    axios
      .post(`${server}/api/v1/create-checkout-session`, {
        updatedProducts,
      })
      .then((res) => {
        if (res.data.redirectUrl) {
          window.location.href = res.data.redirectUrl;
        } else {
          // console.log(res.data);
          //   alert(res.data);
        }
      })
      .catch((err) => {
        // console.log(err.message);
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
