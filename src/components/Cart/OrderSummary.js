import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setItemsPrice,
  setTaxPrice,
  setTotalPrice,
} from "../../App/features/orderSlice";
const OrderSummary = ({ handleOrder, confirm = false }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const gst = 0.18;
  const deliveryCharge = 10;
  const discount = 10;
  const dispatch = useDispatch();

  const salePrice = (price, percent) => {
    let discount = (percent * price) / 100;
    return Math.round(price - discount);
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.onSale) {
        return (
          total + salePrice(item.price, item.discount) * Number(item.quantity)
        );
      } else {
        return total + item.price * Number(item.quantity);
      }
    }, 0);
  };

  const calculateFinalTotal = (subtotal, gst, deliveryCharge, discount) => {
    dispatch(setItemsPrice(subtotal));
    const gstAmount = Math.round(subtotal * gst);
    dispatch(setTaxPrice(gstAmount));
    const totalBeforeDiscount = subtotal + gstAmount + deliveryCharge;
    const finalTotal = totalBeforeDiscount - discount;
    dispatch(setTotalPrice(finalTotal));
    return finalTotal;
  };
  return (
    <div className="px-4 py-1 bg-white rounded-2xl pt-4 ">
      <div className="bg-blue-600 text-white font-semibold p-2 mb-2">
        <p>Price Summary</p>
      </div>
      <div>
        <p className="flex justify-between">
          <span>Subtotal:</span>
          <span>&#8377; {calculateTotal().toLocaleString("hi-IN")}</span>
        </p>
        <p className="flex justify-between">
          <span>GST ({(gst * 100).toFixed(0)}%):</span>
          <span>
            &#8377; {Math.round(calculateTotal() * gst).toLocaleString("hi-IN")}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Charge:</span>
          <span>&#8377; {deliveryCharge}</span>
        </p>
        <p className="flex justify-between">
          <span>Discount:</span>
          <span className="text-red-500">-&#8377; {discount}</span>
        </p>
        <p className="flex justify-between">
          <span>Total:</span>
          <span>
            &#8377;{" "}
            {calculateFinalTotal(
              calculateTotal(),
              gst,
              deliveryCharge,
              discount
            ).toLocaleString("hi-IN")}
          </span>
        </p>
      </div>

      <div className="my-4 flex-center">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="w-full px-2 py-1 border-gray-300 border-b-2 focus:outline-none"
        />
        {!confirm && (
          <div className="w-full flex justify-around gap-2 mt-4">
            <button className="border-2 hover:bg-blue-500 text-blue-500 border-blue-500 text-center hover:text-white px-4 py-2 w-1/2">
              Apply Coupon
            </button>
            <button
              className="bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2 w-1/2"
              onClick={handleOrder}
            >
              Place order
            </button>
          </div>
        )}
        {confirm && (
          <div className="w-full flex justify-around gap-2 mt-4">
            <button className="border-2 hover:bg-blue-500 text-blue-500 border-blue-500 text-center hover:text-white px-4 py-2 w-1/2">
              Apply Coupon
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
