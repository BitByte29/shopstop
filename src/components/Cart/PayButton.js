import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PayButton = ({ cartItems }) => {
  const { user } = useSelector((s) => s.users);
  const { apiKey } = useSelector((s) => s.vars);

  const calculateTotalPrice = (price, discount) => {
    let discountAmount = (discount * price) / 100;
    let salePrice = price - discountAmount;
    return salePrice + (18 / 100) * salePrice;
  };

  const updatedProducts = cartItems.map((product) => ({
    ...product,
    price: Math.round(calculateTotalPrice(product.price, product.discount)),
  }));

  const handleClick = () => {
    axios
      .post("http://localhost:3001/api/v1/create-checkout-session", {
        updatedProducts,
      })
      .then((res) => {
        if (res.data.redirectUrl) {
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
        className="bg-cyan-500 px-3 py-2 hover:-translate-y-2 transition-all"
        onClick={handleClick}
      >
        Pay now.
      </button>
    </>
  );
};

export default PayButton;
