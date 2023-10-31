import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../App/features/userSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser } from "react-icons/fa";
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
      <div className="rounded-3xl bg-cyan-600  overflow-hidden">
        <h2 className="py-3 text-lg md:text-xl font-semibold text-center text-white bg-cyan-600">
          Edit your Password
        </h2>
        <form
          action=""
          onSubmit={handleUpdateSubmit}
          className="flex gap-2 flex-col md:p-5 p-2 bg-white"
        >
          <div className="input-div2">
            <FaEnvelope />
            <input
              className=""
              type="text"
              value={editEmail}
              placeholder="Email"
              onChange={handleEmailChange}
              name="email"
            />
          </div>
          <div className="input-div2">
            <FaUser />
            <input
              className=""
              type="text"
              value={editName}
              placeholder="Name"
              onChange={handleNameChange}
              name="name"
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
              onClick={() => setModalClose(true)}
              className="btn border-[2px] box-border rounded-lg border-cyan-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
