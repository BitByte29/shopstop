import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../App/features/userSlice";
// import { useNavigate } from "react-router-dom";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdKey } from "react-icons/md";

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
    <div className="fixed inset-0 z-50 flex items-center flex-col justify-center bg-black bg-opacity-70">
      <div className="rounded-3xl bg-cyan-600  overflow-hidden">
        <h2 className="py-3 text-lg md:text-xl font-semibold text-center text-white bg-cyan-600">
          Edit your Password
        </h2>
        {/* <div className="p-5 bg-white  "> */}
        <form
          action=""
          onSubmit={handleUpdateSubmit}
          className="flex gap-2 flex-col md:p-5 p-2 bg-white"
        >
          <div className="input-div2">
            <label htmlFor="oldPassword" className="font-semibold">
              <MdKey />
            </label>
            <input
              type="password"
              value={passwords.oldPassword}
              onChange={handleChange}
              name="oldPassword"
              placeholder="Old Password"
              id="oldPassword"
              autoFocus
            />
          </div>
          <div className="input-div2">
            <label htmlFor="newPassword" className="font-semibold">
              <FaLockOpen />
            </label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
            />
          </div>
          <div className="w-full input-div2">
            <label htmlFor="confirmPassword" className="font-semibold">
              <FaLock />
            </label>
            <input
              type="password"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <div className="flex-row gap-2 flex-center mt-2">
            <button
              type="submit"
              className="btn bg-cyan-600 border-2 rounded-lg border-cyan-600 text-white"
            >
              Update
            </button>
            <button
              onClick={() => setPassModalClose(true)}
              className="btn border-[2px] box-border rounded-lg border-cyan-600"
            >
              Cancel
            </button>
          </div>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
};

export default EditPassword;
