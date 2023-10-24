import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CartIcon = () => {
  const cartSize = useSelector((s) => s.cart.cartSize);
  return (
    <>
      {" "}
      <FaShoppingCart />
      <span className="absolute top-[-60%] left-[60%]  text-lg flex-center bg-red-500 text-white rounded-full w-6 h-6">
        {cartSize}
      </span>
    </>
  );
};

export default CartIcon;
