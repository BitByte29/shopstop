import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../../App/features/cartSlice";

import { FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";

const CartItem = ({ item, list = false }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const salePrice = (price, percent) => {
    let discount = (percent * price) / 100;
    return price - discount;
  };

  const handleIncrease = () => {
    if (quantity <= item.stock) {
      setQuantity(quantity + 1);
      dispatch(increaseQuantity(item.product));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decreaseQuantity(item.product));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(item.product));
    toast.success("Item removed from cart.");
  };
  const getPrice = (item) => {
    if (item.onSale) {
      return salePrice(item.price, item.discount);
    }
    return item.price;
  };

  const formatPrice = (price) => {
    return price.toLocaleString("hi-IN");
  };

  return (
    <div className="border border-gray-300 p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-52 h-52 md:w-52 md:h-52 mb-4 md:mb-0 md:mr-4 flex items-center justify-center">
          <img
            src={item.image}
            className="max-w-full max-h-full"
            alt="A cart item"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">{item.name}</p>
          <div className="mt-2">
            {!list && <span className="text-gray-600">Quantity:</span>}
            <div className="flex items-center mt-1">
              {!list && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={handleDecrease}
                >
                  -
                </button>
              )}
              {list && <span>Quantity: </span>}{" "}
              <p className="mx-2">{quantity}</p>
              {!list && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={handleIncrease}
                >
                  +
                </button>
              )}
            </div>
          </div>
          {list && (
            <p>
              <span className="text-xl  pt-4 font-semibold">
                &#8377; {formatPrice(getPrice(item) * quantity)}
              </span>
            </p>
          )}
        </div>
      </div>
      {!list && (
        <div className="mt-4 md:mt-0 text-center md:text-left">
          <p>
            <span className="text-xl font-semibold">
              &#8377; {formatPrice(getPrice(item) * quantity)}
            </span>
          </p>
        </div>
      )}
      {!list && (
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded self-center"
          onClick={handleRemove}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default CartItem;
