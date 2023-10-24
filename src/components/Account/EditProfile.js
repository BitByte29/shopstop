import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../App/features/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user, setModalClose }) => {
  const [editEmail, setEditEmail] = useState(user.email);
  const [editName, setEditName] = useState(user.name);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name: editName, email: editEmail }));
    naviagte("/profile");
  };

  const handleEmailChange = (e) => {
    setEditEmail(e.target.value); // Update the state with the new value
  };
  const handleNameChange = (e) => {
    setEditName(e.target.value); // Update the state with the new value
  };
  return (
    // <div className="absolute top-0 h-[100vh] left-0 w-[100%] bg-transparent flex-center">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="p-5 rounded-lg bg-cyan-500">
        <h2 className="pb-4 font-semibold text-center">Update your profile</h2>
        <form action="" onSubmit={handleUpdateSubmit} className="auth">
          <div className="w-full input-div">
            <span className="font-semibold">Email:</span>
            <input
              className=""
              type="text"
              value={editEmail}
              onChange={handleEmailChange}
              name="email"
            />
          </div>
          <div className="w-full input-div">
            <span className="font-semibold">Name:</span>
            <input
              className=""
              type="text"
              value={editName}
              onChange={handleNameChange}
              name="name"
            />
          </div>
          <div className="flex-row gap-2 flex-center">
            <button type="submit">Update</button>
            <button
              onClick={() => setModalClose(true)}
              className="hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
