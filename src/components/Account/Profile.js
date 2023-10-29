import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import { formatDateFromTimestamp } from "../../utils/functions";
const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const [modalClose, setModalClose] = useState(true);
  const [passModalClose, setPassModalClose] = useState(true);

  return (
    <>
      <div className="flex min-h-[90vh] bg-red-100 flex-col md:flex-row items-center justify-center py-5">
        {!modalClose && (
          <EditProfile user={user} setModalClose={setModalClose} />
        )}
        {!passModalClose && (
          <EditPassword setPassModalClose={setPassModalClose} />
        )}
        <div className="flex-1 gap-y-12 flex-center">
          {" "}
          <h2 className="text-2xl font-semibold">My Profile</h2>
          <img
            src={user.avatar.url}
            alt=""
            className="w-[200px] rounded-full border-2 border-black"
          />
          <button
            onClick={() => setModalClose(false)}
            className="px-4 py-2 text-white transition-all hover:scale-110 bg-cyan-600 hover:-translate-y-2 hover:shadow-lg"
          >
            Edit Profile
          </button>
        </div>
        <div className="flex-1 flex-center my-10 ">
          <div className="items-start gap-8 ms-4 flex-center">
            <div className="text-2xl">
              N<span className="text-lg uppercase">ame</span>:{" "}
              <p className="inline-block text-lg font-semibold uppercase first-letter:text-2xl">
                {user.name}
              </p>
            </div>
            <div className="text-2xl">
              E<span className="text-lg uppercase">mail</span>:{" "}
              <p className="inline-block text-lg font-semibold uppercase first-letter:text-2xl">
                {user.email}
              </p>
            </div>
            <div className="text-2xl">
              J<span className="text-lg uppercase">oined on</span>:{" "}
              <p className="inline-block text-lg font-semibold uppercase first-letter:text-2xl">
                {user.joinedOn
                  ? formatDateFromTimestamp(user.joinedOn)
                  : "Feb 8, 23"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 pr-8">
              <button
                onClick={() => setPassModalClose(false)}
                className="px-4 py-2 text-white transition-all hover:scale-110 bg-cyan-600 hover:-translate-y-2 hover:shadow-lg"
              >
                Change Password
              </button>
              <Link
                to={"/myorders"}
                className="px-4 py-2 text-white transition-all hover:scale-110 bg-cyan-600 hover:-translate-y-2 hover:shadow-lg"
              >
                My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
