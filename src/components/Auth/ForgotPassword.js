import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../App/features/userSlice";
// import { useNavigate } from "react-router-dom";
import Loader from "../subs/Loader";
import "./authStyle.css";
import { FaEnvelope, FaTimes } from "react-icons/fa";
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
        <div className="fixed inset-0 z-50 flex items-center flex-col justify-center bg-black bg-opacity-70">
          <div className="rounded-3xl bg-cyan-600  overflow-hidden">
            <h2 className="py-3 text-lg md:text-xl font-semibold text-center text-white bg-cyan-600 relative">
              Forgot Password{" "}
              <span
                className="absolute cursor-pointer right-2"
                onClick={() => setforgotPasswordPrompt(false)}
              >
                <FaTimes />
              </span>
            </h2>
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex gap-2 flex-col md:p-5 p-2 bg-white"
            >
              <div className="input-div2">
                <FaEnvelope />

                <input
                  type="text"
                  value={email}
                  name="email"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex-row gap-2 flex-center mt-2">
                <button
                  type="submit"
                  className="btn bg-cyan-600 border-2 rounded-lg border-cyan-600 text-white"
                >
                  Get reset Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
