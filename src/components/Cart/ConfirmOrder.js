import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import Shipping from "./Shipping";
import { MdCheck } from "react-icons/md";
import PayButton from "./PayButton";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems, shippingInfoCorrect } = useSelector(
    (s) => s.cart
  );
  const navigate = useNavigate();
  const [shippingForm, setShippingForm] = useState(false);
  const [orders, setOrders] = useState(true);
  //   const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (cartItems.length < 1) {
      toast("Add Items in Cart");
      navigate("/cart");
    }
    if (!shippingInfo) {
      toast("Add shipping details first.");
      navigate("/shipping");
    }
  }, [navigate, cartItems, shippingInfo]);

  return (
    <div className="min-h-[90vh]">
      <div className="min-h-full px-2 md:px-16 py-4 flex-col md:flex-row flex gap-8">
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="rounded-3xl overflow-hidden border-blue-500 border-2">
            <div className="text-3xl  bg-blue-600 p-2 text-white flex gap-2 items-center">
              1. Login{" "}
              <span className="text-green-600  rounded-full">
                <MdCheck />
              </span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border-blue-500 border-2">
            <div
              className="text-3xl  bg-blue-600 p-2 text-white flex gap-2 items-center"
              onClick={() => setShippingForm(!shippingForm)}
            >
              2. Shipping Info
              {shippingInfoCorrect && (
                <span className="text-green-600  rounded-full">
                  <MdCheck />
                </span>
              )}
            </div>
            {shippingForm && (
              <div className="py-10 border-2">
                <Shipping
                  setShippingForm={setShippingForm}
                  shippingForm={shippingForm}
                />
              </div>
            )}
          </div>
          <div className="rounded-3xl overflow-hidden border-blue-500 border-2">
            <div
              className="text-3xl  bg-blue-600 p-2 text-white flex gap-2 items-center"
              onClick={() => setOrders(!orders)}
            >
              3. Order Items
              {shippingInfoCorrect && (
                <span className="text-green-600   rounded-full">
                  <MdCheck />
                </span>
              )}
            </div>
            {orders && (
              <div className="flex flex-wrap justify-center gap-4 border-2 py-2">
                {cartItems.map((item) => (
                  <CartItem key={item.product} item={item} list={true} />
                ))}
              </div>
            )}
          </div>
          <div className="rounded-3xl overflow-hidden border-blue-500 border-2">
            <div className="text-3xl  bg-blue-600 p-2 text-white flex gap-2 items-center">
              4. Payment
            </div>
            {shippingInfoCorrect && (
              <div className="py-2 flex gap-5 items-center px-5 ">
                You would be redirected to the payment page-{" "}
                <PayButton cartItems={cartItems} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3 ">
          <OrderSummary confirm={true} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
