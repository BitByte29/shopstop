import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../App/features/userSlice";
// import { useNavigate } from "react-router-dom";
import "./authStyle.css";
import { resetPassword } from "../../App/features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
      <div className="p-5 bg-cyan-500">
        <h2 className="pb-4 font-semibold text-center">Edit your Password</h2>
        <form action="" onSubmit={handleUpdateSubmit} className=" auth">
          <div className="w-full input-div">
            <span className="font-semibold">New password:</span>
            <input
              className=""
              type="text"
              value={passwords.password}
              onChange={handleChange}
              name="password"
              autoFocus
            />
          </div>
          <div className="w-full input-div">
            <span className="font-semibold">Confirm Password:</span>
            <input
              type="text"
              value={passwords.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <div className="flex-row gap-2 flex-center">
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
