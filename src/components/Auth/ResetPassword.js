import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./authStyle.css";
import { resetPassword } from "../../App/features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock, FaLockOpen } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ ...passwords, token }));
    navigate("/auth");
  };

  return (
    // <div className="absolute top-0 h-[100vh] left-0 w-[100%] bg-transparent flex-center">
    <div className="min-h-[77vh] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="rounded-3xl bg-cyan-600  overflow-hidden">
        <h2 className="py-3 text-lg md:text-xl font-semibold text-center text-white bg-cyan-600">
          Reset your Password
        </h2>
        <form
          action=""
          onSubmit={handleUpdateSubmit}
          className="flex gap-2 flex-col md:p-5 p-2 bg-white"
        >
          <div className="input-div2">
            <FaLockOpen />
            <input
              className=""
              type="text"
              value={passwords.password}
              placeholder="New Password"
              onChange={handleChange}
              name="password"
              autoFocus
            />
          </div>
          <div className="input-div2">
            <FaLock />
            <input
              type="text"
              value={passwords.confirmPassword}
              placeholder="Confirm password"
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <div className="flex-row gap-2 flex-center mt-2">
            <button
              type="submit"
              className="btn bg-cyan-600 border-2 rounded-lg border-cyan-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
