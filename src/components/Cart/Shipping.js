import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShippingInfoCorrect,
  updateShippingInfo,
} from "../../App/features/cartSlice";
import {
  FaMapMarkerAlt,
  FaFlag,
  FaPhone,
  FaLocationArrow,
} from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import "./formStyle.css";
import Cart from "./Cart";

const Shipping = ({ shippingForm, setShippingForm }) => {
  const shippingInfo = useSelector((s) => s.cart.shippingInfo);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShippingInfoCorrect(true));
    setShippingForm(!shippingForm);
  };

  const onChange = (e) => {
    const InfoS = { ...shippingInfo, [e.target.name]: e.target.value };
    console.log(InfoS);
    dispatch(setShippingInfoCorrect(false));
    dispatch(updateShippingInfo(InfoS));
  };

  return (
    <>
      <div className=" flex-center">
        {/* <div className="pb-8">
          <h2 className="text-3xl font-semibold">Add Shipping Details</h2>
        </div> */}
        <form action="" onSubmit={handleSubmit}>
          <div className="input-div">
            <FaLocationArrow />

            <input
              type="text"
              value={shippingInfo.Info}
              onChange={onChange}
              name="Info"
              placeholder="Info Line 1"
            />
          </div>
          <div className="input-div">
            <FaPhone />
            <input
              type="number"
              onChange={onChange}
              value={shippingInfo.phoneNumber}
              name="phoneNumber"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="input-div">
            <MdLocationCity />

            <input
              type="text"
              onChange={onChange}
              value={shippingInfo.city}
              name="city"
              placeholder="City"
            />
          </div>
          <div className="input-div">
            <FaFlag />
            <input
              type="text"
              onChange={onChange}
              value={shippingInfo.state}
              name="state"
              placeholder="State"
            />
          </div>
          <div className="input-div">
            <FaMapMarkerAlt />

            <input
              type="number"
              onChange={onChange}
              name="pin"
              value={shippingInfo.pin}
              placeholder="Pincode"
              required
            />
          </div>
          <div className="flex justify-center gap-2 flex-col">
            <button type="submit">Confirm Shipping Details</button>
            {/* <button>Back to cart</button> */}
          </div>
        </form>
      </div>
      {/* <Cart /> */}
    </>
  );
};

export default Shipping;
