import React, { useState } from "react";
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
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");

  const validatePhoneNumber = (value) => {
    if (/^\d{10}$/.test(value)) {
      setPhoneNumberError(""); // Valid phone number
      return true;
    } else {
      setPhoneNumberError("Please enter 10-digit phone number.");
      return false;
    }
  };

  const validatePinCode = (value) => {
    if (/^\d{6}$/.test(value)) {
      setPinCodeError(""); // Valid PIN code
      return true;
    } else {
      setPinCodeError("Please enter a valid 6-digit PIN code.");
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPhoneNumberValid = validatePhoneNumber(shippingInfo.phoneNumber);
    const isPinCodeValid = validatePinCode(shippingInfo.pinCode);

    if (isPhoneNumberValid && isPinCodeValid) {
      dispatch(setShippingInfoCorrect(true));
      setShippingForm(!shippingForm);
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(setShippingInfoCorrect(true));
  //   setShippingForm(!shippingForm);
  // };

  const onChange = (e) => {
    const InfoS = { ...shippingInfo, [e.target.name]: e.target.value };
    if (e.target.name === "phoneNumber") {
      validatePhoneNumber(e.target.value);
    }
    if (e.target.name === "pinCode") {
      validatePinCode(e.target.value);
    }
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
              value={shippingInfo.address}
              onChange={onChange}
              name="address"
              placeholder="Address"
              required
            />
          </div>
          <div className="input-div relative">
            <FaPhone />
            <input
              type="number"
              onChange={onChange}
              value={shippingInfo.phoneNumber}
              name="phoneNumber"
              placeholder="Phone Number"
              required
            />
            {phoneNumberError.length > 0 && (
              <p className="text-sm text-red-600 absolute top-full right-0">
                *{phoneNumberError}
              </p>
            )}
          </div>
          <div className="input-div">
            <MdLocationCity />

            <input
              type="text"
              onChange={onChange}
              value={shippingInfo.city}
              name="city"
              placeholder="City"
              required
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
              required
            />
          </div>
          <div className="input-div">
            <FaMapMarkerAlt />

            <input
              type="number"
              onChange={onChange}
              name="pinCode"
              value={shippingInfo.pinCode}
              placeholder="Pincode"
              required
            />
            {pinCodeError.length > 0 && (
              <p className="text-sm text-red-600 absolute top-full right-0">
                *{pinCodeError}
              </p>
            )}
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
