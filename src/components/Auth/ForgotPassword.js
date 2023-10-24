import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../App/features/userSlice";
// import { useNavigate } from "react-router-dom";
import Loader from "../subs/Loader";
import "./authStyle.css";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const ForgotPassword = ({ setforgotPasswordPrompt }) => {
  const [email, setEmail] = useState("");
  const loading = useSelector((s) => s.users.loading);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
    setEmail("");
    toast.warning("Check your spam folder as well");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-40">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-5 bg-cyan-500">
          <h2 className="relative pb-4 font-semibold text-center flex-center">
            Forgot Password{" "}
            <span
              className="absolute cursor-pointer right-2"
              onClick={() => setforgotPasswordPrompt(false)}
            >
              <FaTimes />
            </span>
          </h2>
          <form action="" onSubmit={handleSubmit} className=" auth">
            <div className="w-full input-div">
              <span className="font-semibold">Enter your Email:</span>

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex-row gap-2 flex-center">
              <button type="submit">Get reset Token</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
