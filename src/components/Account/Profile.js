import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import { formatDateFromTimestamp } from "../../utils/functions";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const [modalClose, setModalClose] = useState(true);
  const [passModalClose, setPassModalClose] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E3192]  to-[#1BFFFF] flex flex-col items-center justify-center py-5">
      {!modalClose && <EditProfile user={user} setModalClose={setModalClose} />}
      {!passModalClose && (
        <EditPassword setPassModalClose={setPassModalClose} />
      )}
      <div className="text-center text-white my-4">
        <h1 className="text-4xl font-extrabold">My Profile</h1>
        <img
          src={user.avatar.url}
          alt=""
          className="w-48 h-48 rounded-full border-4 border-white mx-auto mt-4"
        />
        {user.role === "visitor" ? (
          <button
            onClick={() => toast.warning("Action not allowed to visitors")}
            className="px-6 py-3 mt-4 text-white transition-transform transform hover:scale-105 bg-blue-700 hover:-translate-y-1 hover:shadow-lg rounded-full"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setModalClose(false)}
            className="px-6 py-3 mt-4 text-white transition-transform transform hover:scale-105 bg-blue-700 hover:-translate-y-1 hover:shadow-lg rounded-full"
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="text-white my-10 text-left mx-4">
        <div className="text-2xl">
          Name: <span className="text-lg font-semibold">{user.name}</span>
        </div>
        <div className="text-2xl">
          Email: <span className="text-lg font-semibold">{user.email}</span>
        </div>
        <div className="text-2xl">
          Joined on:{" "}
          <span className="text-lg font-semibold">
            {user.joinedOn
              ? formatDateFromTimestamp(user.joinedOn)
              : "Feb 8, 23"}
          </span>
        </div>
        <div className="flex items-center space-x-4 mt-8">
          {user.role === "visitor" ? (
            <button
              onClick={() => toast.warning("Action not allowed to visitors")}
              className="px-6 py-3 text-white transition-transform transform hover:scale-105 bg-purple-700 hover:-translate-y-1 hover:shadow-lg rounded-full"
            >
              Change Password
            </button>
          ) : (
            <button
              onClick={() => setPassModalClose(false)}
              className="px-6 py-3 text-white transition-transform transform hover:scale-105 bg-purple-700 hover:-translate-y-1 hover:shadow-lg rounded-full"
            >
              Change Password
            </button>
          )}
          <Link
            to="/myorders"
            className="px-6 py-3 text-white transition-transform transform hover:scale-105 bg-green-500 hover:-translate-y-1 hover:shadow-lg rounded-full"
          >
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
