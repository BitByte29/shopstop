import React, { useEffect, useState } from "react";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { IoIosClose, IoIosEye } from "react-icons/io";
import "./authStyle.css";
const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  useEffect(() => {
    setIsLoginPage(true);
  }, []);

  return (
    <div className="h-[80vh] bg-red-300  flex items-center justify-center">
      <div className="h-[400px] w-[300px] bg-white flex flex-col">
        <div className="flex">
          <button
            className="py-2  w-[50%]"
            onClick={() => setIsLoginPage(true)}
          >
            Login
          </button>
          <button
            className="py-2  bg-yellow-300 w-[50%]"
            onClick={() => setIsLoginPage(false)}
          >
            Sign up
          </button>
        </div>
        <div
          className={`min-w-full bg-white flex h-full w-full overflow-hidden`}
        >
          <form
            action=""
            className={`min-w-full bg-cyan-600 ${
              isLoginPage ? "" : "-translate-x-[100%]"
            } transition-all auth`}
          >
            <div className="input-div">
              <FaEnvelope />
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-div">
              <FaKey />
              <input type="password" placeholder="Password" />
              <IoIosEye className="absolute right-4" />
              <IoIosClose className="hidden" />
            </div>

            <button>Login</button>

            <p>
              Create a accout?{" "}
              <span onClick={() => setIsLoginPage(true)}>Signup</span>
            </p>
          </form>
          <form
            action=""
            className={`min-w-full bg-yellow-300 ${
              isLoginPage ? "" : "-translate-x-[100%]"
            } transition-all auth`}
          >
            <div className="input-div">
              <FaUser />
              <input type="text" placeholder="Name" autoFocus />
            </div>
            <div className="input-div">
              <FaEnvelope />
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-div">
              <FaKey />
              <input type="password" placeholder="Password" />
              <IoIosEye className="absolute right-4" />
              <IoIosClose className="hidden" />
            </div>

            <button>Signup</button>

            <p>
              Already a user?{" "}
              <span onClick={() => setIsLoginPage(true)}>Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
