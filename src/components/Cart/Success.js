import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createNewOrder } from "../../App/features/orderSlice";
import { clearCart } from "../../App/features/cartSlice";
import { toast } from "react-toastify";

function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successParam = queryParams.get("success");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((s) => s.cart);
  const { itemsPrice, totalPrice, taxPrice } = useSelector((s) => s.orders);

  const data = {
    shippingInfo,
    orderItems: cartItems,
    paymentInfo: {
      id: "Stripe payement id",
      status: "Paid",
    },
    itemsPrice,
    taxPrice,
    shippingPrice: 10,
    totalPrice,
  };

  useEffect(() => {
    // if (isAuthenticated) {
    if (successParam === "true") {
      //Create Order and clear cart
      dispatch(createNewOrder(data));
      dispatch(clearCart());
      toast("Payment processed successfully");
      navigate("/products");
    } else if (successParam === "false") {
      navigate("/cart");
      toast("There was an error while processing payment");
    } else {
      navigate("/notfound");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Payment Info</h2>
      {successParam === "true" ? (
        <p>Success! Payment done..</p>
      ) : (
        <p>There was an issue while doing payment.</p>
      )}
    </div>
  );
}

export default Success;
