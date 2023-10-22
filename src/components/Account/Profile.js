import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.users);

  const formatDateFromTimestamp = (timestamp) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="flex h-[90vh] bg-red-100">
        <div className="flex-1 gap-y-12 flex-center">
          {" "}
          <h2 className="text-2xl font-semibold">My Profile</h2>
          <img
            src={user.avatar.url}
            alt=""
            className="w-[200px] rounded-full border-2 border-black"
          />
          <Link
            to={"/editProfile"}
            className="px-4 py-2 text-white transition-all hover:scale-110 bg-cyan-600 hover:-translate-y-2 hover:shadow-lg"
          >
            Edit Profile
          </Link>
        </div>
        <div className="items-start ms-4 flex-center">
          <p className="text-2xl">
            N<span className="text-lg uppercase">ame</span>:{" "}
            <p className="inline-block text-lg font-semibold uppercase first-letter:text-2xl">
              {user.name}
            </p>
          </p>
          <p className="text-2xl">
            E<span className="text-lg uppercase">mail</span>:{" "}
            <p className="inline-block text-lg font-semibold uppercase first-letter:text-2xl">
              {user.email}
            </p>
          </p>
          <p className="text-2xl">
            J<span className="text-lg uppercase">oined on</span>:{" "}
            <p className="inline-block text-lg font-semibold uppercase first-letter:text-2xl">
              {user.joinedOn
                ? formatDateFromTimestamp(user.joinedOn)
                : "Feb 8, 23"}
            </p>
          </p>
          <div className="flex flex-wrap gap-2 pt-4 pr-8">
            <Link
              to={"/updataPassword"}
              className="px-4 py-2 text-white transition-all hover:scale-110 bg-cyan-600 hover:-translate-y-2 hover:shadow-lg"
            >
              Change Password
            </Link>
            <Link
              to={"/myorders"}
              className="px-4 py-2 text-white transition-all hover:scale-110 bg-cyan-600 hover:-translate-y-2 hover:shadow-lg"
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
