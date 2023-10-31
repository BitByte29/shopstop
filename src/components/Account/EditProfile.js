import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProfileUpdate,
  updateProfile,
} from "../../App/features/userSlice";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const EditProfile = ({ user, setModalClose }) => {
  const [editName, setEditName] = useState(user.name);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { loading, accountCreated } = useSelector((s) => s.users);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(`${user.avatar.url}`);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(clearProfileUpdate());
    const myForm = new FormData();
    myForm.set("name", editName);
    if (avatar) {
      myForm.set("avatar", avatar);
    }
    dispatch(updateProfile(myForm));
    // setModalClose(true);
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
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
          <div id="registerImage" className="p-0">
            <img src={avatarPreview} alt="" className="rounded-full" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex-row gap-2 flex-center mt-2">
            {loading ? (
              <button
                type="submit"
                className="btn bg-cyan-600 border-2 rounded-lg border-cyan-600 text-white"
              >
                <span className="text-transparent border-4 rounded-full border-cyan-600 text-sm animate-spin border-b-yellow-500">
                  oo
                </span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-cyan-600 border-2 rounded-lg border-cyan-600 text-white"
              >
                Update
              </button>
            )}

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
