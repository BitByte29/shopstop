import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../App/features/userSlice";
// import { useNavigate } from "react-router-dom";

const EditPassword = ({ setPassModalClose }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ ...passwords }));
  };

  return (
    // <div className="absolute top-0 h-[100vh] left-0 w-[100%] bg-transparent flex-center">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="p-5 bg-cyan-500">
        <h2 className="pb-4 font-semibold text-center">Edit your Password</h2>
        <form action="" onSubmit={handleUpdateSubmit} className=" auth">
          <div className="w-full input-div">
            <span className="font-semibold">Old password:</span>
            <input
              className=""
              type="text"
              value={passwords.oldPassword}
              onChange={handleChange}
              name="oldPassword"
              autoFocus
            />
          </div>
          <div className="w-full input-div">
            <span className="font-semibold">New Password:</span>
            <input
              type="text"
              value={passwords.newPassword}
              onChange={handleChange}
              name="newPassword"
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
            <button type="submit">Update</button>
            <button onClick={() => setPassModalClose(true)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPassword;
