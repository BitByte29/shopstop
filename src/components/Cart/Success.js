import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successParam = queryParams.get("success");
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((s) => s.users);
  // const {cartItems}

  useEffect(() => {
    if (isAuthenticated) {
      if (successParam === "true") {
        //Create ORder
        //Clear cartItems
        //orders
        alert("You Paid successfully");
      }
    } else {
      navigate("/auth");
    }
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
