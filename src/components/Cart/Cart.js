import Metadata from "../layout/Metadata";
import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdShoppingCartCheckout } from "react-icons/md";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((s) => s.users.isAuthenticated);

  const handleOrder = () => {
    if (isAuthenticated) {
      navigate("/confirmorder");
    } else {
      toast.warning("Login to place order.");
      navigate("/auth");
    }
  };

  return (
    <>
      <Metadata title="My Cart" />
      {cartItems.length > 0 ? (
        <div className="bg-lp  flex flex-col md:flex-row">
          <div className="flex flex-col py-5 px-4 w-full md:w-3/4 md:min-h-screen">
            <div className="bg-blue-600 text-white flex justify-between px-4 py-2">
              <p>Item</p>
              <p className="hidden md:block ">Subtotal</p>
            </div>
            <div>
              {cartItems.map((item) => (
                <CartItem key={item.product} item={item} />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/4 p-4 bg-lp relative">
            <OrderSummary handleOrder={handleOrder} />
          </div>
        </div>
      ) : (
        <div className="min-h-[90vh] flex-center text-3xl">
          <MdShoppingCartCheckout className="text-6xl text-red-600" />
          <p>No items in your cart</p>{" "}
          <button
            onClick={() => navigate("/products")}
            className=" text-blue-900 underline text-lg"
          >
            Continue shopping
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
